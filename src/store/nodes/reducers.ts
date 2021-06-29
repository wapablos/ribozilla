/* eslint-disable no-case-declarations */
import { Reducer, PayloadAction } from 'typesafe-actions'
import { addEdge, Edge, removeElements, Elements } from 'react-flow-renderer'
import { RibozillaNode } from '@screens/pipeline/internals'
import { NodesState, NodesActionTypes } from './types'

const initialState: NodesState = {
  nodes: [],
  update: false
}

const nodesReducer : Reducer<NodesState, PayloadAction<NodesActionTypes, RibozillaNode & Edge & Elements>> = (state = initialState, action) => {
  switch (action.type) {
    case NodesActionTypes.ADD_NODE:
      return { ...state, nodes: [...state.nodes, action.payload], update: true }

    case NodesActionTypes.DELETE_NODE:
      const deleteElements = state.nodes.filter(({ id }) => id === action.payload.id)
      return { ...state, nodes: removeElements(deleteElements, state.nodes), update: true }

    case NodesActionTypes.LOAD_NODES:
      console.log(action)
      return { ...state, nodes: action.payload, update: false }

    case NodesActionTypes.UPDATE_NODES:
      return { ...state, update: false }

    case NodesActionTypes.LINK_NODES:
      return { ...state, nodes: addEdge(action.payload as Edge, state.nodes), update: true }

    case NodesActionTypes.UPDATE_FLOW:
      if (action.payload === undefined) return { ...state, update: true }

      const index = state.nodes.findIndex(({ id }) => id === action.payload.id)
      const lastState = state.nodes
      lastState[index] = action.payload
      return { ...state, nodes: lastState, update: true }

    default:
      return state
  }
}

export { nodesReducer }
