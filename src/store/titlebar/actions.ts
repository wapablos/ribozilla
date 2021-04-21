import { action } from 'typesafe-actions'
import { TitlebarActionTypes, TitlebarState } from './types'

export const maxWindow = (isMax: TitlebarState['isMaximized']) => action(TitlebarActionTypes.MAXIMIZE, isMax)
