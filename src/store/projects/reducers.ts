import { Reducer, PayloadAction } from 'typesafe-actions'
import { ProjectsEvents } from '@constants/events'
import { ProjectState, ProjectActionTypes } from './types'

const initialState: ProjectState = {
  toggleCard: false,
  recentProjects: [],
  projectIsOpen: false
}

const projectsReducer: Reducer<ProjectState, PayloadAction<ProjectActionTypes, ProjectState>> = (state = initialState, action) => {
  switch (action.type) {
    case ProjectActionTypes.SHOW_PROJECT_CARD:
      return { ...state, toggleCard: action.payload.toggleCard }
    case ProjectActionTypes.REQ_SUCCESS:
      console.log('Chamou')
      console.log(action.payload)
      return { ...state, recentProjects: action.payload.recentProjects }
    default:
      return state
  }
}

export { projectsReducer }
