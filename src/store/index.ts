import { combineReducers, createStore, Store } from 'redux'

/**
 * Top-level state
 */
export interface ApplicationState {
}

/**
 * Root reducer
 */
const createRootReducer = combineReducers({})

/**
 * Root saga
 */

/**
  * Global store
  */
const store: Store<ApplicationState> = createStore(createRootReducer)

export default store
