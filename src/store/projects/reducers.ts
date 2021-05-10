import { Reducer, PayloadAction } from 'typesafe-actions'
import { ProjectState, ProjectActionTypes } from './types'

const initialState: ProjectState = {
  toggleCard: false
}

const projectsReducer: Reducer<ProjectState, PayloadAction<ProjectActionTypes, ProjectState>> = (state = initialState, action) => {
  switch (action.type) {
    case ProjectActionTypes.SHOW_PROJECT_CARD:
      return { toggleCard: action.payload.toggleCard }
    default:
      return state
  }
}

export { projectsReducer }
