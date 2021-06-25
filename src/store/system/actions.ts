import { action } from 'typesafe-actions'
import { SystemActionTypes, ProjectDataState } from './types'

export const updateProjectFiles = () => action(SystemActionTypes.WRITE_REQ)
export const writeProjectError = () => action(SystemActionTypes.WRITE_ERROR)
export const writeProjectSuccess = () => action(SystemActionTypes.WRITE_OK)
export const openProjectPath = (currentPath: string, name: string) => action(SystemActionTypes.OPEN_PROJECT, <ProjectDataState>{ currentProject: { currentPath, name } })
