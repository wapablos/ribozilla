import { shell, BrowserWindow, dialog, app } from 'electron'
import * as lo from 'lodash'
import * as os from 'os'

export async function openRibozillaDocs() {
  await shell.openExternal('https://ribozilla-preview.netlify.app/')
}

export async function openAboutDialog(win: BrowserWindow) {
  dialog.showMessageBox(win, {
    message: app.name,
    detail: `
    Copyright © 2021 
    wapablos & contributors\n
    Version: ${app.getVersion()}
    OS: ${lo.capitalize(os.platform())} ${os.arch()} ${os.release()}`
  })
}
