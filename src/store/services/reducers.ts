/* eslint-disable no-case-declarations */
import { Reducer, PayloadAction } from 'typesafe-actions'
import { GithubServiceActionTypes, GithubServiceState } from './types'

const initialState: GithubServiceState = {
  extensions: {
    available: [],
    installed: []
  },
  loading: false,
  error: false,
  success: false
}

const githubExtensionsReducer: Reducer<GithubServiceState, PayloadAction<GithubServiceActionTypes, GithubServiceState['extensions']>> = (state = initialState, action) => {
  switch (action.type) {
    case GithubServiceActionTypes.GITHUB_LOAD_REQUEST:
      return { ...state, loading: true, error: false, success: false }

    case GithubServiceActionTypes.GITHUB_LOAD_SUCCESS:
      return { ...state, loading: false, error: false, success: true, extensions: action.payload }

    case GithubServiceActionTypes.GITHUB_LOAD_FAILURE:
      return { ...state, loading: false, error: true, success: false }

    default:
      return state
  }
}

export { githubExtensionsReducer }
