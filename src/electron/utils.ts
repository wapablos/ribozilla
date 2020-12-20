/* eslint-disable consistent-return */
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
import { ISystemInfo, IReadWrite } from '@constants/interfaces'

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
      defaults: { projects: [] as Array<IProjectData> }
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
    this.loadFiles()
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
      const undefinedPath = projectPath === (undefined || '')
      const projectMeta = args
      if (undefinedName || undefinedPath) {
        const error: IReadWrite = {
          status: 'error',
          message: undefinedName
            ? 'You must give a name to your project'
            : 'You must choose a valid path to save your project'
        }

        return this.win.webContents.send(ReadWriteEvents.WRITE_FILE_STATUS, error)
      }

      const folderExists = jetpack.exists(jetpack.path(projectPath, name)) === 'dir'

      if (folderExists) {
        const error: IReadWrite = {
          status: 'error',
          message: 'It seems a project already exists on selected folder \n  Please, choose another name or folder!'
        }
        return this.win.webContents.send(ReadWriteEvents.WRITE_FILE_STATUS, error)
      }

      if (!folderExists) {
        const saveStatus = jetpack
          .cwd(projectPath)
          .dir(name)
          .file(`${name}.rzproject`, { content: projectMeta })

        const error: IReadWrite = {
          status: 'error',
          message: 'Cannot create the project \n Verify yor read and write permissions'
        }

        const success: IReadWrite = {
          status: 'success',
          message: 'Successfully created project'
        }

        if (saveStatus.exists(`${name}.rzproject`) === 'file') {
          this.addProject(args)
          this.win.webContents.send(ReadWriteEvents.WRITE_FILE_STATUS, success)
          console.log(`name: ${name} \n description: ${description} \n projectPath: ${projectPath}`)
        } else {
          console.log(error)
          return this.win.webContents.send(ReadWriteEvents.WRITE_FILE_STATUS, error)
        }
      }
    })
  }

  public sendProjects() {
    ipcMain.on(ProjectsEvents.REQUEST, () => {
      this.win.webContents.send(ProjectsEvents.RESPONSE, this.getProjects())
    })
  }

  public sendOnChangeProjects() {
    this.projects.onDidChange('projects', () => {
      console.log('Mudancinhas')
      this.win.webContents.send(ProjectsEvents.UPDATE, this.getProjects())
    })
  }

  public getProjects(): IProjectData[] {
    return this.projects.get(this.schemaKey)
  }

  public addProject(project: IProjectData) {
    const currentProjects = this.getProjects()

    this.projects.set(this.schemaKey, [...currentProjects, project])
  }

  public loadFiles() {
    ipcMain.on(FileBrowserEvents.CHOOSE_FILE, () => {
      dialog.showOpenDialog(this.win, {
        properties: ['openFile']
      })
    })
  }

  public deleteProjects() {

  }

  public loadProjects() {

  }
}
