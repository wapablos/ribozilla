import { action } from 'typesafe-actions'
import { FlowElement, Edge, Connection } from 'react-flow-renderer'
import { RibozillaNode } from '@screens/pipeline/internals'
import { NodesActionTypes } from './types'

export const addNode = (nodes: FlowElement) => action(NodesActionTypes.ADD_NODE, nodes)
export const deleteNode = (id: string) => action(NodesActionTypes.DELETE_NODE, <RibozillaNode>{ id })
export const loadNodes = action(NodesActionTypes.LOAD_NODES)
export const linkNodes = (connection: Edge | Connection) => action(NodesActionTypes.LINK_NODES, connection)
