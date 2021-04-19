import { App, BrowserWindow, ipcMain, dialog } from 'electron'
import Store from 'electron-store'
import * as os from 'os'
import * as jetpack from 'fs-jetpack'
import { AppEvents, DevToolsEvents, WindowControlsEvents } from '@constants/events'

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

    constructor(app: App, win: BrowserWindow) {
      this.app = app
      this.win = win
    }

    public initAllListeners() {
      this.appQuit()
      this.showDevTools()
      this.windowControls()
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

    public windowControls() {
      ipcMain.on(WindowControlsEvents.MAXIMIZE, () => {
        this.win.isMaximized() ? this.win.unmaximize() : this.win.maximize()
      })

      ipcMain.on(WindowControlsEvents.MINIMIZE, () => this.win.minimize())
      ipcMain.on(WindowControlsEvents.CLOSE, () => this.win.closeFilePreview())
    }
}
