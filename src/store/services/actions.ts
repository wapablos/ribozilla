import { action } from 'typesafe-actions'
import { GithubServiceActionTypes, GithubServiceState } from './types'

export const githubLoadRequest = () => action(GithubServiceActionTypes.GITHUB_LOAD_REQUEST)
export const githubLoadSuccess = (extensions: GithubServiceState['extensions']) => action(GithubServiceActionTypes.GITHUB_LOAD_SUCCESS, extensions)
export const githubLoadFailure = () => action(GithubServiceActionTypes.GITHUB_LOAD_FAILURE)
export const githubUpdateAll = () => action(GithubServiceActionTypes.GITHUB_UPDATE_ALL)
