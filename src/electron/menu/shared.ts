import { IREWMenu } from 'react-electron-window-menu'
/**
 * Use just the options that both share
 */

export const fileMenu: IREWMenu.IMenuItem = {
  label: 'File',
  submenu: [
    { label: 'New Project', accelerator: 'CmdOrCtrl+N' },
    { type: 'separator' },
    { label: 'Open Project', accelerator: 'CmdOrCtrl+O' },
    { type: 'separator' },
    { label: 'Save', accelerator: 'CmdOrCtrl+S', click: (args) => { console.log(args) } }
  ]
}

export const helpMenu: IREWMenu.IMenuItem = {
  label: 'Help',
  submenu: [
    { label: 'About Ribozilla' },
    { label: 'Help' }
  ]
}

export const terminalMenu: IREWMenu.IMenuItem = {
  label: 'Terminal',
  submenu: [
    { label: 'New Terminal' },
    { label: 'Run Tasks' }
  ]
}

export const sharedOptions = [fileMenu, terminalMenu, helpMenu]
