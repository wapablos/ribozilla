import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import AppHandler from './utils'

/**
 * User variables
 */
const isDevelopment = process.env.NODE_ENV === 'development'

const outputFolder = (file: string = '') => path.join(app.getAppPath(), isDevelopment ? '' : 'dist', file)

const file = {
  preload: outputFolder('preload.js'),
  html: outputFolder('index.html')
}

/**
 * Window variables
 */

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 640,
    frame: false,
    webPreferences: {
      devTools: isDevelopment,
      webSecurity: true,
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      enableRemoteModule: false,
      nativeWindowOpen: true,
      preload: file.preload
    }
  })

  Menu.setApplicationMenu(null)

  if (isDevelopment) {
    win.loadURL('http://localhost:4000/')
  } else {
    win.loadFile(file.html)
  }

  const appHandler = new AppHandler(app, win)
  appHandler.initAllListeners()
}

app.allowRendererProcessReuse = true

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
