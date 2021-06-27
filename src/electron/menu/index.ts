import { Menu } from 'electron'
import { sharedOptions } from './shared'
import { aboutAppMenu } from './macos'

const appMenu = Menu.buildFromTemplate([aboutAppMenu, ...sharedOptions as any])

export default appMenu
