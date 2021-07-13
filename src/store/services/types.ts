import { IExtensionList } from '@constants/interfaces'

export enum GithubServiceActionTypes {
  GITHUB_LOAD_REQUEST = '@@extensions/GITHUB_LOAD_REQUEST',
  GITHUB_LOAD_SUCCESS = '@@extensions/GITHUB_LOAD_SUCCESS',
  GITHUB_LOAD_FAILURE = '@@extensions/GITHUB_LOAD_FAILURE',
  GITHUB_UPDATE_ALL = '@@extensions/GITHUB_UPDATE_ALL'
}

export interface GithubServiceState {
    readonly extensions: IExtensionList
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
}
