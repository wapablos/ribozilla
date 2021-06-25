/* eslint-disable no-case-declarations */
import { Reducer, PayloadAction } from 'typesafe-actions'
import { ExtensionsState, ExtensionsActionTypes } from './types'

const initialState: ExtensionsState = {
  extensions: [],
  loading: false,
  error: false,
  success: false
}

const extensionsReducer: Reducer<ExtensionsState, PayloadAction<ExtensionsActionTypes, ExtensionsState['extensions']>> = (state = initialState, action) => {
  switch (action.type) {
    case ExtensionsActionTypes.LOAD_REQUEST:
      return { ...state, loading: true, error: false, success: false }

    case ExtensionsActionTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, success: true, extensions: action.payload }

    case ExtensionsActionTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, success: false }

    default:
      return state
  }
}

export { extensionsReducer }
