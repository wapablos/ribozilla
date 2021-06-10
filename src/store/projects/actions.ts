import { action } from 'typesafe-actions'
import { IProjectMeta } from '@constants/interfaces'
import { ProjectActionTypes, ProjectState } from './types'

export const createNewProject = (toggle: boolean) => action(ProjectActionTypes.SHOW_PROJECT_CARD, <ProjectState>{ toggleCard: toggle })
export const loadProjects = () => action(ProjectActionTypes.REQ_PROJECTS)
export const loadProjectsSuccess = (projects: IProjectMeta[]) => action(ProjectActionTypes.REQ_SUCCESS, <ProjectState>{ recentProjects: projects })
export const loadProjectsFailure = () => action(ProjectActionTypes.REQ_FAILURE)
