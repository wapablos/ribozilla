import { Reducer, PayloadAction } from 'typesafe-actions'
import { ProjectDataState, SystemActionTypes } from './types'

const initialState: ProjectDataState = {
  currentProject: {
    name: undefined,
    currentPath: undefined
  },
  writeRequest: false,
  writeError: false
}

const projectDataReducer: Reducer<ProjectDataState, PayloadAction<SystemActionTypes, ProjectDataState>> = (state = initialState, action) => {
  switch (action.type) {
    case SystemActionTypes.WRITE_REQ:
      console.log('(System Reducer) Request')
      return { ...state, writeRequest: true }

    case SystemActionTypes.WRITE_OK:
      console.log('(System Reducer) Success')
      return { ...state, writeRequest: false, writeError: false }

    case SystemActionTypes.WRITE_ERROR:
      console.log('(System Reducer) Error')
      return { ...state, writeRequest: false, writeError: true }

    case SystemActionTypes.OPEN_PROJECT:
      console.log('(System Reducer) Open Project', action.payload)
      return { ...state, currentProject: action.payload.currentProject }

    default:
      return state
  }
}

export { projectDataReducer }
