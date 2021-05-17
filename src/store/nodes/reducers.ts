/* eslint-disable no-case-declarations */
import { Reducer, PayloadAction } from 'typesafe-actions'
import { FlowElement, addEdge, Edge, Connection, removeElements } from 'react-flow-renderer'
import { RibozillaNode } from '@screens/pipeline/internals'
import { NodesState, NodesActionTypes } from './types'

const initialState: NodesState = {
  nodes: []
}

const nodesReducer : Reducer<NodesState, PayloadAction<NodesActionTypes, RibozillaNode & Edge>> = (state = initialState, action) => {
  switch (action.type) {
    case NodesActionTypes.ADD_NODE:
      return { ...state, nodes: [...state.nodes, action.payload] }

    case NodesActionTypes.DELETE_NODE:
      const deleteElements = state.nodes.filter(({ id }) => id === action.payload.id)
      return { ...state, nodes: removeElements(deleteElements, state.nodes) }

    case NodesActionTypes.LOAD_NODES:
      console.log('load')
      return state

    case NodesActionTypes.LINK_NODES:
      console.log('link')
      return { ...state, nodes: addEdge(action.payload as Edge, state.nodes) }

    default:
      return state
  }
}

export { nodesReducer }
