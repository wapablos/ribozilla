import { Elements } from 'react-flow-renderer'

export enum NodesActionTypes {
    ADD_NODE='@@nodes/ADD_NODE',
    DELETE_NODE='@@nodes/DELETE_NODE',
    LOAD_NODES='@@nodes/LOAD_NODES',
    LINK_NODES='@@nodes/LINK_NODES',
    UPDATE_NODES='@@nodes/UPDATE_NODES',
    UPDATE_FLOW='@@nodes/UPDATE_FLOW'
}

export interface NodesState {
    readonly nodes: Elements
    readonly update: boolean
}
