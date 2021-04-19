import { app, MenuItemConstructorOptions } from 'electron'

export const aboutAppMenu: MenuItemConstructorOptions = {
  label: app.name,
  role: 'appMenu'
}
