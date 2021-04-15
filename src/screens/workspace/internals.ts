import { DevToolsEvents } from '@constants/events'

export const toggleDevTools = () => window.electron.send(DevToolsEvents.TOOGLE)
