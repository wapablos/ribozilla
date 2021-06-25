/* eslint-disable no-case-declarations */
import { Reducer, PayloadAction } from 'typesafe-actions'
import { addEdge, Edge, removeElements } from 'react-flow-renderer'
import { RibozillaNode } from '@screens/pipeline/internals'
import { NodesState, NodesActionTypes } from './types'

const initialState: NodesState = {
  nodes: [],
  updateProject: false
}

const nodesReducer : Reducer<NodesState, PayloadAction<NodesActionTypes, RibozillaNode & Edge>> = (state = initialState, action) => {
  switch (action.type) {
    case NodesActionTypes.ADD_NODE:
      return { ...state, nodes: [...state.nodes, action.payload], updateProject: !state.updateProject }

    case NodesActionTypes.DELETE_NODE:
      const deleteElements = state.nodes.filter(({ id }) => id === action.payload.id)
      return { ...state, nodes: removeElements(deleteElements, state.nodes), updateProject: !state.updateProject }

    case NodesActionTypes.LOAD_NODES:
      return state

    case NodesActionTypes.LINK_NODES:
      return { ...state, nodes: addEdge(action.payload as Edge, state.nodes), updateProject: !state.updateProject }

    default:
      return state
  }
}

export { nodesReducer }
