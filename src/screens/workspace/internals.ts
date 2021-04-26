import { AppEvents } from '@constants/events'

export const toggleDevTools = () => window.electron.ipcRenderer.send(AppEvents.TOOGLE_DEVTOOLS)
