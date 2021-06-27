import { action } from 'typesafe-actions'
import { FlowElement, Edge, Connection, Elements } from 'react-flow-renderer'
import { RibozillaNode } from '@screens/pipeline/internals'
import { NodesActionTypes } from './types'

export const addNode = (nodes: FlowElement) => action(NodesActionTypes.ADD_NODE, nodes)
export const deleteNode = (id: string) => action<any, Partial<RibozillaNode>>(NodesActionTypes.DELETE_NODE, { id })
export const loadNodes = (nodes: Elements) => action(NodesActionTypes.LOAD_NODES, nodes)
export const linkNodes = (connection: Edge | Connection) => action(NodesActionTypes.LINK_NODES, connection)
export const updateNodes = action(NodesActionTypes.UPDATE_NODES)
export const updateFlow = (nodes: FlowElement) => action(NodesActionTypes.UPDATE_FLOW, nodes)
