/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import {
  App, BrowserWindow, ipcMain, dialog
} from 'electron'
import Store from 'electron-store'
import * as os from 'os'
import * as jetpack from 'fs-jetpack'

import {
  AppEvents, SystemInfoEvents, DevToolsEvents,
  FileBrowserEvents, ReadWriteEvents, ProjectsEvents
} from '@constants/events'
import { IProjectData } from '@screens/projects'

export interface ISystemInfo {
  arch: string
  hostname: string
  platform: string
  release: string
}

interface ProjectSchema {
  projects: IProjectData[]
}
export default class AppHandler {
  private app: App

  private win: BrowserWindow

  private schemaKey: string

  private projects: Store<ProjectSchema>

  constructor(app: App, win: BrowserWindow) {
    this.app = app
    this.win = win
    this.schemaKey = 'projects'
    this.projects = new Store({
      name: 'recents',
      watch: true,
      defaults: { projects: [{} as IProjectData] }
    })
  }

  public set browserWindow(win: BrowserWindow) {
    this.win = win
  }

  public initAllListeners() {
    this.appQuit()
    this.showDevTools()
    this.systemInfo()
    this.chooseDir()
    this.saveProject()
    this.sendProjects()
    this.sendOnChangeProjects()
  }

  public appQuit() {
    ipcMain.on(AppEvents.QUIT, () => {
      this.app.quit()
    })
  }

  public showDevTools() {
    ipcMain.on(DevToolsEvents.TOOGLE, () => {
      this.win.webContents.toggleDevTools()
    })
  }

  public systemInfo() {
    const sysinfo: ISystemInfo = {
      arch: os.arch(),
      hostname: os.hostname(),
      platform: os.platform(),
      release: os.release()
    }

    ipcMain.on(SystemInfoEvents.REQUEST, () => {
      this.win.webContents.send(SystemInfoEvents.RESPONSE, sysinfo)
    })
  }

  public chooseDir() {
    ipcMain.on(FileBrowserEvents.CHOOSE_DIR, () => {
      dialog
        .showOpenDialog(this.win,
          {
            properties: ['openDirectory']
          })
        .then(({ canceled, filePaths }) => {
          if (!canceled) {
            console.log(filePaths)
            this.win.webContents.send(FileBrowserEvents.PROJECT_PATH, filePaths)
          } else {
            console.log('Canceled!')
          }
        })
        .catch((errno) => {
          console.log('ERRNO: ', errno)
        })
    })
  }

  public saveProject() {
    ipcMain.on(ReadWriteEvents.WRITE_FILE_NEW, (events, args: IProjectData) => {
      const { name, description, projectPath } = args
      const undefinedName = name === (undefined || '')
      const undefinedPath = projectPath === undefined
      const projectMeta = args

      if (undefinedName || undefinedPath) {
        dialog.showMessageBoxSync(this.win, {
          type: 'error',
          buttons: ['OK'],
          title: undefinedName ? 'Invalid name' : 'Invalid path',
          message: undefinedName ? 'You must give a name to your project' : 'You must choose a valid path to save your project'
        })
        return
      }

      if (jetpack.exists(jetpack.path(projectPath, name)) === 'dir') {
        dialog.showMessageBoxSync(this.win, {
          type: 'error',
          buttons: ['OK'],
          title: 'Duplicated project',
          message: 'It seems a project already exists on selected folder \n Please, choose another name or folder!'
        })
        return
      }

      const saveStatus = jetpack
        .cwd(projectPath)
        .dir(name)
        .file(`${name}.rzproject`, { content: projectMeta })

      if (saveStatus.exists(`${name}.rzproject`) === 'file') {
        this.addProject(args)
        console.log('OK')
      } else console.log('An undefined error occurred!')

      console.log(`name: ${name} \n description: ${description} \n projectPath: ${projectPath}`)
    })
  }

  public sendProjects() {
    ipcMain.on(ProjectsEvents.REQUEST, () => {
      this.win.webContents.send(ProjectsEvents.RESPONSE, this.getProjects())
    })
  }

  public sendOnChangeProjects() {
    this.projects.onDidAnyChange(() => {
      console.log('Mudancinhas')
      this.win.webContents.send(ProjectsEvents.RESPONSE, this.getProjects())
    })
  }

  public getProjects(): IProjectData[] {
    return this.projects.get(this.schemaKey)
  }

  public addProject(project: IProjectData) {
    const currentProjects = this.getProjects()

    this.projects.set(this.schemaKey, [...currentProjects, project])
  }

  public deleteProjects() {

  }
}
