export enum ProjectActionTypes {
    SHOW_PROJECT_CARD='@@project/SHOW_PROJECT_CARD',
    ADD_PROJECT='@@project/ADD_PROJECT',
    DELETE_PROJECT='@@project/DELETE_PROJECT',
    LOAD_PROJECTS='@@project/LOAD_PROJECTS',
    OPEN_PROJECT='@@project/OPEN_PROJECT',
    OPEN_FAILED='@@project/OPEN_FAILED'
}

export interface ProjectState {
    readonly toggleCard: boolean
    readonly projectIsOpen: boolean
}
