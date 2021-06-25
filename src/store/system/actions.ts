import { action } from 'typesafe-actions'
import { SystemActionTypes } from './types'

export const updateProjectFiles = () => action(SystemActionTypes.WRITE_REQ)
export const writeProjectError = () => action(SystemActionTypes.WRITE_ERROR)
export const writeProjectSuccess = () => action(SystemActionTypes.WRITE_OK)
