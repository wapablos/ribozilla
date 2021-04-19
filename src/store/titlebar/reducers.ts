import { Reducer, Action } from 'typesafe-actions'
import { WindowControlsEvents } from '@constants/events'
import { TitlebarActionTypes } from './types'

const titlebarReducer: Reducer<void, Action<TitlebarActionTypes>> = (state, action) => {
  switch (action.type) {
    case TitlebarActionTypes.MAXIMIZE:
      window.electron.ipcRenderer.send(WindowControlsEvents.MAXIMIZE)
      return null
    case TitlebarActionTypes.MINIMIZE:
      window.electron.ipcRenderer.send(WindowControlsEvents.MINIMIZE)
      return null
    case TitlebarActionTypes.CLOSE:
      window.electron.ipcRenderer.send(WindowControlsEvents.CLOSE)
      return null
    default:
      return null
  }
}

export { titlebarReducer }
