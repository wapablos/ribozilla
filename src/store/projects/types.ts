import { IProjectMeta } from '@constants/interfaces'

export enum ProjectActionTypes {
    SHOW_PROJECT_CARD='@@project/SHOW_PROJECT_CARD',
    ADD_PROJECT='@@project/ADD_PROJECT',
    DELETE_PROJECT='@@project/DELETE_PROJECT',
    REQ_PROJECTS='@@project/REQ_PROJECTS',
    REQ_SUCCESS='@@project/REQ_SUCCESS',
    REQ_FAILURE='@@project/REQ_FAILURE',
    OPEN_PROJECT='@@project/OPEN_PROJECT',
    OPEN_FAILURE='@@project/OPEN_FAILED'
}

export interface ProjectState {
    readonly toggleCard: boolean
    readonly recentProjects: IProjectMeta[]
}
