import { app, MenuItemConstructorOptions } from 'electron'
import { openRibozillaDocs, openAboutDialog } from './menuFunctions'

export const aboutAppMenu: MenuItemConstructorOptions = {
  label: app.name,
  submenu: [
    { label: 'About Ribozilla', click: (menu, win) => openAboutDialog(win) },
    { label: 'Help', click: openRibozillaDocs },
    { type: 'separator' },
    { role: 'services' },
    { type: 'separator' },
    { role: 'hide' },
    { role: 'unhide' },
    { type: 'separator' },
    { role: 'quit' }
  ]
}
