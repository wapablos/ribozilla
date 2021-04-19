import { combineReducers, createStore, Store } from 'redux'
import { titlebarReducer, TitlebarState } from '@store/titlebar'
/**
 * Top-level state
 */
export interface ApplicationState {
  titlebar: TitlebarState
}

/**
 * Root reducer
 */
const createRootReducer = combineReducers({
  titlebar: titlebarReducer
})

/**
 * Root saga
 */

/**
  * Global store
  */
const store: Store<ApplicationState> = createStore(createRootReducer)

export default store
