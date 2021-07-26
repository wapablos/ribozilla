import { app, BrowserWindow, ipcMain, dialog, ipcRenderer } from 'electron'
import { AppEvents, WindowControlsEvents, FileBrowserEvents, ReadWriteEvents, ProjectsEvents, PipelineEvents } from '@constants/events'
import { IProjectMeta, IReadWrite, IProjectData } from '@constants/interfaces'
import jetpack from 'fs-jetpack'
import Store from 'electron-store'
import { join } from 'path'
import { openAboutDialog, openRibozillaDocs } from './menu/menuFunctions'
import { appPath, RecentsSchema, recentsBasename, toolboxPath } from './storage'

export const isDevelopment = process.env.NODE_ENV === 'development'
export const isMacintosh = process.platform === 'darwin'
export const isWindows = process.platform === 'win32'
export const isLinux = process.platform === 'linux'

export class ElectronHandler {
  private win: BrowserWindow
  private recents: Store<RecentsSchema>

  constructor(win: BrowserWindow) {
    this.win = win
    this.recents = new Store({ name: recentsBasename, cwd: appPath, watch: true })
  }

  public handleWindowControlsEvents() {
    this.win.setTitle('No Project')

    ipcMain.on(AppEvents.QUIT, () => {
      console.log('+ App Quitting')
      app.quit()
    })
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
    ipcMain.on(WindowControlsEvents.CLOSE, () => app.quit())

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

  public wakeListeners() {
    this.handleWindowControlsEvents()
    this.windowControls()
    this.chooseDir()
  }
}
