import { action } from 'typesafe-actions'
import { TitlebarActionTypes } from './types'

export const maxWindow = action(TitlebarActionTypes.MAXIMIZE)
export const minWindow = action(TitlebarActionTypes.MINIMIZE)
export const closeWindow = action(TitlebarActionTypes.CLOSE)
