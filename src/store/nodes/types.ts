import { Elements } from 'react-flow-renderer'
import { RibozillaNode } from '@screens/pipeline/internals'

export enum NodesActionTypes {
    ADD_NODE='@@nodes/ADD_NODE',
    DELETE_NODE='@@nodes/DELETE_NODE',
    LOAD_NODES='@@nodes/LOAD_FAILURE'
}

export interface NodesState {
    readonly nodes: RibozillaNode[]
}
