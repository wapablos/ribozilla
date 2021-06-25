import { IProjectMeta } from '@constants/interfaces'

export enum SystemActionTypes {
    READ_FROM_DISK='@@system/READ_FROM_DISK',
    WRITE_REQ='@@system/WRITE_REQ',
    WRITE_OK='@@system/WRITE_OK',
    WRITE_ERROR='@@system/WRITE_ERROR'
}

interface ProjectData {
    currentPath: string
    lastPipeline?: {
        nodes: any,
        cards: any
    }
    tmpPipeline?: {
        nodes:any,
        cards: any
    }[]
}

export interface ProjectDataState {
    readonly currentProject: ProjectData
    readonly writeRequest?: boolean
    readonly writeError?: boolean
}
