import { App, BrowserWindow, ipcMain } from 'electron'
import { AppEvents, WindowControlsEvents } from '@constants/events'

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
      ipcMain.on(AppEvents.TOOGLE_DEVTOOLS, () => {
        this.win.webContents.toggleDevTools()
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
      ipcMain.on(WindowControlsEvents.CLOSE, () => this.app.quit())
    }
}
