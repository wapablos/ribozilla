/* eslint-disable array-callback-return */
import { app, BrowserWindow, session, Menu } from 'electron'
import * as path from 'path'
import AppHandler, { isDevelopment, isMac } from './app-handler'
import { checkAppConfigFiles, handleExtensions, handleExtensionsStorage } from './storage'
import appMenu from './menu'

const outputFolder = (file: string) => path.join(app.getAppPath(), isDevelopment ? '' : 'build', file)

const file = {
  preload: outputFolder('preload.js'),
  html: outputFolder('index.html')
}

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 1100,
    width: 1100,
    height: 740,
    minHeight: 740,
    frame: isDevelopment || isMac,
    maximizable: true,
    fullscreenable: false,
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

  if (isMac) {
    Menu.setApplicationMenu(appMenu)
  } else {
    Menu.setApplicationMenu(null)
  }

  if (isDevelopment) {
    win.loadURL('http://localhost:4000/')
  } else {
    win.loadFile(file.html)
  }

  const appHandler = new AppHandler(app, win)
  appHandler.initAllListeners()
}

app.allowRendererProcessReuse = true

if (process.platform === 'linux') {
  app.disableHardwareAcceleration()
}

app.on('ready', async () => {
  checkAppConfigFiles()
  handleExtensions()
  handleExtensionsStorage()
})

app.whenReady().then(async () => {
  createWindow()
})

app.on('window-all-closed', app.quit)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
