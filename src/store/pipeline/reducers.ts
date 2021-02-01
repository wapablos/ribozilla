import { useState } from 'react'
import { Reducer, PayloadAction, action } from 'typesafe-actions'
import { ApplicationState } from '@store'
import { useSelector, useDispatch } from 'react-redux'
import { PipelineState, NodeMetadata, PipelineActionTypes } from './types'

const initialState: PipelineState = {
  nodeId: 0,
  data: []
}

const pipelineReducer: Reducer<PipelineState, PayloadAction<PipelineActionTypes, any>> = (state = initialState, action) => {
  switch (action.type) {
    case PipelineActionTypes.ADD_NODE:
      return { ...state, nodeId: state.nodeId + 1, data: [...state.data, action.payload] }
    default:
      return state
  }
}

export { pipelineReducer }
