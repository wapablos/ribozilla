import { DevToolsEvents } from '@constants/events'

export const toggleDevTools = () => window.electron.ipcRenderer.send(DevToolsEvents.TOOGLE)
