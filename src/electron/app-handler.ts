/* eslint-disable no-case-declarations */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import { App, BrowserWindow, ipcMain, dialog, ipcRenderer } from 'electron'
import { AppEvents, WindowControlsEvents, FileBrowserEvents, ReadWriteEvents, ProjectsEvents, PipelineEvents } from '@constants/events'
import { IProjectMeta, IReadWrite, IProjectData } from '@constants/interfaces'
import jetpack from 'fs-jetpack'
import Store from 'electron-store'
import { join } from 'path'
import { appPath, RecentsSchema, recentsBasename, toolboxPath } from './storage'
import { openRibozillaDocs, openAboutDialog } from './menu/menuFunctions'

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
// TODO: Mudar local de leitura adicionar o caminho totaL no recents e ler o arquivo
export default class AppHandler {
    private app: App
    private win: BrowserWindow
    private recents: Store<RecentsSchema>

    constructor(app: App, win: BrowserWindow) {
      this.app = app
      this.win = win
      this.recents = new Store({ name: recentsBasename, cwd: appPath, watch: true })
    }

    public appQuit() {
      this.win.setTitle('No Project')
      ipcMain.on(AppEvents.QUIT, () => { this.app.exit() })
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

      ipcMain.handle('about-app', () => {
        openAboutDialog(this.win)
      })

      ipcMain.handle('open-doc', () => {
        openRibozillaDocs()
      })
    }

    public chooseDir() {
      ipcMain.handle(FileBrowserEvents.CHOOSE_DIR, async () => {
        const dir = await dialog
          .showOpenDialog(this.win, { properties: ['openDirectory'] })
          .then(({ filePaths }) => filePaths[0])
          .catch((errno) => { console.log(errno) })

        return dir
      })

      ipcMain.handle(FileBrowserEvents.CHOOSE_FILE, async (e) => {
        const dir = await dialog
          .showOpenDialog(this.win, { properties: ['openFile', 'multiSelections'] })
          .then(({ filePaths }) => filePaths)
          .catch((errno) => { console.log(errno) })

        return dir
      })
    }

    public saveProjectMeta() {
      ipcMain.handle(ReadWriteEvents.WRITE_FILE, async (event, req: IProjectMeta) => {
        const { id, name, path, description } = req
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
          const createFile = jetpack.cwd(path).dir(name).file(`${name}.ribozilla`, { content: { id, name, description } })

          if (createFile.exists(`${name}.ribozilla`) === 'file') {
            try {
              jetpack.cwd(path).dir(name).dir('.toolbox')
              this.addRecentProjects({ id, description, name, path: join(path, name), file: join(path, name, `${name}.ribozilla`) })
            } catch (error) {
              return writeProjError
            }
            return writeProjSuccess
          }

          return writeProjError
        }
      })
    }

    public addRecentProjects(project: Partial<IProjectMeta>) {
      const recentProjects = this.getRecentProjects()
      this.recents.set('recents', [...recentProjects, project])
    }

    public getRecentProjects() {
      const projects = this.recents.get(recentsBasename)
      return projects
    }

    public loadRecentProjects() {
      ipcMain.handle(ProjectsEvents.GET_RECENTS, () => this.getRecentProjects())
    }

    public updateRecentProjects() {
      console.log('----Will update-----')
      this.recents.onDidChange(recentsBasename, () => {
        this.win.webContents.send(ProjectsEvents.UPDATE, 0)
      })
    }

    public deleteRecentProjects() {
      ipcMain.handle(ProjectsEvents.DELETE_RECENT, (event, { id }: IProjectMeta) => {
        console.log('(Deleted)', id)
        const projects = this.getRecentProjects()
        this.recents.set('recents', projects.filter((value) => value.id !== id))
        return id
      })
    }

    public checkIfProjectExists() {
      const readProjError: (path: string) => IReadWrite = (p) => ({
        status: 'error',
        message: `This project doesn't exists at ${p}`
      })

      const readProjSuccess: IReadWrite = {
        status: 'success',
        message: 'Loading'
      }

      ipcMain.handle(ProjectsEvents.OPEN_PROJECT, (event, args: IProjectMeta) => {
        console.log('(Electron Project)', args)
        switch (jetpack.exists(args.file)) {
          case undefined:
            return readProjError(args.path)
          case false:
            return readProjError(args.path)
          default:
            this.win.setTitle(args.name)
            return readProjSuccess
        }
      })

      // TODO: Checar integridade
      ipcMain.handle(ReadWriteEvents.READ_FILE, async (event, projectPath: string) => {
        const nodes = toolboxPath(projectPath, 'nodes.json')
        switch (jetpack.exists(nodes)) {
          case 'file':
            console.log('Loading nodes from', nodes)
            return jetpack.readAsync(nodes, 'json')
          default:
            console.log('Creating node files to', nodes)
            jetpack.writeAsync(nodes, { nodes: [] })
            return jetpack.readAsync(nodes, 'json')
        }
      })
    }

    public handleProjectIO() {
      const writeFileError: IReadWrite = {
        status: 'error',
        message: 'Cannot write file, check your read/write permission'
      }

      const writeFileSuccess: (path: string) => IReadWrite = (p) => ({
        status: 'info',
        message: `Saved ${p}`
      })

      const write = true
      ipcMain.handle(ReadWriteEvents.WRITE_PROJECT, (events, args: IProjectData) => {
        console.log('IOStream: ', args)
        const { path, nodes } = args
        const exists = jetpack.find(path, { matching: '*.ribozilla' })
        try {
          if (exists.length > 0) {
            jetpack.write(toolboxPath(path, 'nodes.json'), { nodes })
            return write
          }
          throw new Error('Ops')
        } catch (error) {
          console.log(error)
          return !write
        }
      })

      ipcMain.handle(ReadWriteEvents.UPDATE_FILES, (events, title: string) => {
        console.log('Needs save')
        if (title !== undefined) {
          this.win.setTitle(title)
        }
      })

      ipcMain.handle(ReadWriteEvents.SAVE_FILE, async (event, { script, command, id }) => {
        const dir = await dialog
          .showSaveDialog(this.win, {
            properties: ['createDirectory', 'showHiddenFiles', 'showOverwriteConfirmation'],
            defaultPath: `${command}-${id}.sh`.toLowerCase()
          })
          .then(({ filePath, canceled }) => {
            console.log('Save to: ', filePath)
            if (canceled) {
              return { status: 'default' } as IReadWrite
            }
            jetpack.write(filePath, script)
            return writeFileSuccess(filePath)
          })
          .catch((errno) => {
            console.log(errno)
            return writeFileError
          })

        return dir
      })
    }

    public initAllListeners() {
      this.appQuit()
      this.showDevTools()
      this.windowControls()
      this.chooseDir()
      this.saveProjectMeta()
      this.loadRecentProjects()
      this.updateRecentProjects()
      this.deleteRecentProjects()
      this.checkIfProjectExists()
      this.handleProjectIO()
    }
}
