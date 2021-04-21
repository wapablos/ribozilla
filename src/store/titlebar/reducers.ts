/* eslint-disable no-case-declarations */
import { Reducer, PayloadAction } from 'typesafe-actions'
import { TitlebarActionTypes, TitlebarState } from './types'

const initialState: TitlebarState = {
  isMaximized: null
}

const titlebarReducer: Reducer<TitlebarState, PayloadAction<TitlebarActionTypes, TitlebarState['isMaximized']>> = (state = initialState, action) => {
  switch (action.type) {
    case TitlebarActionTypes.MAXIMIZE:
      return { isMaximized: action.payload }
    default:
      return state
  }
}

export { titlebarReducer }
