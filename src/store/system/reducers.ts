import { Reducer, PayloadAction } from 'typesafe-actions'
import { ProjectDataState, SystemActionTypes } from './types'

const initialState: ProjectDataState = {
  currentProject: {
    currentPath: '/Users/wapablos/Downloads/Projetinho 1',
    lastPipeline: {
      nodes: [],
      cards: []
    },
    tmpPipeline: []
  },
  writeRequest: false,
  writeError: false
}

const projectDataReducer: Reducer<ProjectDataState, PayloadAction<SystemActionTypes, ProjectDataState>> = (state = initialState, action) => {
  console.log('(System Reducer) ', action.type)
  switch (action.type) {
    case SystemActionTypes.WRITE_OK:
      return { ...state, writeRequest: false, writeError: false }

    case SystemActionTypes.WRITE_ERROR:
      return { ...state, writeRequest: false, writeError: true }

    default:
      return state
  }
}

export { projectDataReducer }
