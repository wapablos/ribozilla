/* eslint-disable no-case-declarations */
import { Reducer, Action } from 'typesafe-actions'
import { TitlebarState } from './types'

const initialState: TitlebarState = {}

const titlebarReducer: Reducer<TitlebarState, Action> = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export { titlebarReducer }
