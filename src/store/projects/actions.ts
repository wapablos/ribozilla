import { action } from 'typesafe-actions'
import { ProjectsCardActionTypes } from './types'

const createNewProject = (toggle: boolean) => action(ProjectsCardActionTypes.SHOW_CARD, toggle)

export { createNewProject }
