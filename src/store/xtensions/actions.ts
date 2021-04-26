import { action } from 'typesafe-actions'
import { ExtensionsState, ExtensionsActionTypes } from './types'

export const loadRequest = () => action(ExtensionsActionTypes.LOAD_REQUEST)
export const loadSuccess = (extensions: ExtensionsState['extensions']) => action(ExtensionsActionTypes.LOAD_SUCCESS, extensions)
export const loadFailure = () => action(ExtensionsActionTypes.LOAD_FAILURE)
