import { IREWMenu } from 'react-electron-window-menu'
import { Menu, MenuItemConstructorOptions } from 'electron'

type RibozillaMenu = IREWMenu.IMenuItem & MenuItemConstructorOptions

/**
 * Use just the options that both share
 */

export const fileMenu: RibozillaMenu = {
  label: 'File',
  submenu: [
    { label: 'New Project', accelerator: 'CmdOrCtrl+N' },
    { type: 'separator' },
    { label: 'Open Project', accelerator: 'CmdOrCtrl+O' },
    { type: 'separator' },
    { label: 'Save', accelerator: 'CmdOrCtrl+S' }
  ]
}

export const helpMenu: RibozillaMenu = {
  label: 'Help',
  submenu: [
    { label: 'About Ribozilla' },
    { label: 'Help' }
  ]
}

export const terminalMenu: RibozillaMenu = {
  label: 'Terminal',
  submenu: [
    { label: 'New Terminal' },
    { label: 'Run Tasks' }
  ]
}

export default [fileMenu, terminalMenu, helpMenu]
