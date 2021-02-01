import { Reducer, PayloadAction } from 'typesafe-actions'
import { ProjectCardState, ProjectsCardActionTypes } from './types'

const initialState: ProjectCardState = {
  toggle: false
}

const projectCardReducer: Reducer<ProjectCardState, PayloadAction<ProjectsCardActionTypes, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case ProjectsCardActionTypes.SHOW_CARD:
      return { toggle: action.payload }
    default:
      return state
  }
}

export { projectCardReducer }
