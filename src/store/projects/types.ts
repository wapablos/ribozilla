/* eslint-disable no-unused-vars */
export enum ProjectsActionTypes {
  NEW_PROJECT='@@projects/NEW_PROJECT',
  DELETE_PROJECT='@@projects/DELETE_PROJECT'
}

export interface IProject {
  id: string
  name: string
  description?: string
  projectPath?: string
}
