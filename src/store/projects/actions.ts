import { action } from 'typesafe-actions'
import { ProjectActionTypes, ProjectState } from './types'

export const createNewProject = (toggle: boolean) => action(ProjectActionTypes.SHOW_PROJECT_CARD, <ProjectState>{ toggleCard: toggle })
