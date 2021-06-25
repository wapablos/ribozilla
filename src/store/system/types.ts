import { IProjectMeta } from '@constants/interfaces'

export enum SystemActionTypes {
    READ_FROM_DISK='@@system/READ_FROM_DISK',
    WRITE_REQ='@@system/WRITE_REQ',
    WRITE_OK='@@system/WRITE_OK',
    WRITE_ERROR='@@system/WRITE_ERROR',
    OPEN_PROJECT='@@system/OPEN_PROJECT'
}

interface ProjectData {
    name: string
    currentPath: string
}

export interface ProjectDataState {
    readonly currentProject: ProjectData
    readonly writeRequest: boolean
    readonly writeError: boolean
}
