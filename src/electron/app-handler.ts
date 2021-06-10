/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import { App, BrowserWindow, ipcMain, dialog } from 'electron'
import { AppEvents, WindowControlsEvents, FileBrowserEvents, ReadWriteEvents, ProjectsEvents } from '@constants/events'
import { IProjectMeta, IReadWrite } from '@constants/interfaces'
import jetpack from 'fs-jetpack'
import Store from 'electron-store'
import { appPath, RecentsSchema, recentsBasename } from './storage'

/**
 * Development variables
 */
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isMac = process.platform === 'darwin'
export const isWindows = process.platform === 'win32'
export const isLinux = process.platform === 'linux'

/**
 * Main Class
 */
export default class AppHandler {
    private app: App
    private win: BrowserWindow
    private recents: Store<RecentsSchema>

    constructor(app: App, win: BrowserWindow) {
      this.app = app
      this.win = win
      this.recents = new Store({ name: recentsBasename, cwd: appPath })
    }

    public appQuit() {
      ipcMain.on(AppEvents.QUIT, () => { this.app.quit() })
    }

    public showDevTools() {
      ipcMain.on(AppEvents.TOOGLE_DEVTOOLS, () => { this.win.webContents.toggleDevTools() })
    }

    public windowControls() {
      const handleMax = () => {
        if (this.win.isMaximized()) {
          this.win.unmaximize()
        } else {
          this.win.maximize()
        }
        this.win.webContents.send(WindowControlsEvents.MAXIMIZE, this.win.isMaximized())
      }

      ipcMain.on(WindowControlsEvents.MAXIMIZE, handleMax)
      ipcMain.on(WindowControlsEvents.MINIMIZE, () => this.win.minimize())
      ipcMain.on(WindowControlsEvents.CLOSE, () => this.app.quit())
    }

    public chooseDir() {
      ipcMain.handle(FileBrowserEvents.CHOOSE_DIR, async () => {
        const dir = await dialog
          .showOpenDialog(this.win, { properties: ['openDirectory'] })
          .then(({ filePaths }) => filePaths[0])
          .catch((errno) => { console.log(errno) })

        return dir
      })
    }

    public saveProjectMeta() {
      ipcMain.handle(ReadWriteEvents.WRITE_FILE, async (event, req: IProjectMeta) => {
        const { name, path, description } = req
        const uname = name === (undefined || '')
        const upath = path === (undefined || '')
        const checkExistingProjectFolder = jetpack.exists(jetpack.path(path, name))

        const undefMetaError: IReadWrite = {
          status: 'error',
          message: uname ? 'You must give a name to your project' : 'You must choose a valid path to save your project'
        }

        const existFolderError: IReadWrite = {
          status: 'error',
          message: 'It seems a project already exists on selected folder\nPlease, choose another name or folder!'
        }

        const writeProjError: IReadWrite = {
          status: 'error',
          message: 'Cannot create the project\nVerify yor read and write permissions'
        }

        const writeProjSuccess: IReadWrite = {
          status: 'success',
          message: 'Successfully created project'
        }

        if (uname || upath) return undefMetaError
        if (checkExistingProjectFolder) return existFolderError

        if (!checkExistingProjectFolder) {
          const createFile = jetpack.cwd(path).dir(name).file(`${name}.ribozilla`, { content: { id: '1', name, description, path } })

          if (createFile.exists(`${name}.ribozilla`) === 'file') {
            this.addRecentProjects(req)
            return writeProjSuccess
          }

          return writeProjError
        }
      })
    }

    public addRecentProjects(project: IProjectMeta) {
      const recentProjects = this.getRecentProjects()
      this.recents.set('recents', [...recentProjects, project])
      console.log(this.getRecentProjects)
    }

    public getRecentProjects() {
      const projects = this.recents.get(recentsBasename)
      console.log(`Projects: \n ${JSON.stringify(projects)}`)
      return projects
    }

    public loadRecentProjects() {
      ipcMain.handle(ProjectsEvents.GET_RECENTS, () => {
        console.log('YEs')
        return this.getRecentProjects()
      })
    }

    public initAllListeners() {
      this.appQuit()
      this.showDevTools()
      this.windowControls()
      this.chooseDir()
      this.saveProjectMeta()
      this.loadRecentProjects()
    }
}
