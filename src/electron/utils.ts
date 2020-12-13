/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import {
  App, BrowserWindow, ipcMain, dialog
} from 'electron'
import * as os from 'os'

import {
  AppEvents, SystemInfoEvents, DevToolsEvents,
  FileBrowserEvents
} from '@constants/events'

export interface ISystemInfo {
  arch: string
  hostname: string
  platform: string
  release: string
}

export default class AppHandler {
  private app: App

  private win: BrowserWindow

  constructor(app: App, win?: BrowserWindow) {
    this.app = app
    this.win = win
  }

  public set browserWindow(win: BrowserWindow) {
    this.win = win
  }

  public initAllListeners() {
    this.appQuit()
    this.showDevTools()
    this.systemInfo()
    this.chooseDir()
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
    ipcMain.on('choose-dir', () => {
      dialog
        .showOpenDialog(this.win,
          {
            properties: ['openDirectory']
          })
        .then(({ canceled, filePaths }) => {
          if (!canceled) {
            console.log(filePaths)
            this.win.webContents.send('selected-dir', filePaths)
          } else {
            console.log('Canceled!')
          }
        })
        .catch((errno) => {
          console.log('ERRNO: ', errno)
        })
    })
  }
}
