import { Reducer, PayloadAction } from 'typesafe-actions'
import { FlowElement } from 'react-flow-renderer'
import { RibozillaNode } from '@screens/pipeline/internals'
import { NodesState, NodesActionTypes, templateNode } from './types'

const initialState: NodesState = {
  nodes: [{
    id: 'node-x',
    type: 'software',
    position: { x: 250, y: 50 },
    data: {
      software: 'Initial',
      command: 'ribozi',
      version: '3.0.0-beta'
    }
  }, templateNode]
}

const nodesReducer : Reducer<NodesState, PayloadAction<NodesActionTypes, RibozillaNode>> = (state = initialState, action) => {
  switch (action.type) {
    case NodesActionTypes.ADD_NODE:
      return { ...state, nodes: [...state.nodes, action.payload] }
    case NodesActionTypes.DELETE_NODE:
      console.log('delete')
      return state
    case NodesActionTypes.LOAD_NODES:
      console.log('load')
      return state
    default:
      return state
  }
}

export { nodesReducer }
