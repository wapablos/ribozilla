import { combineReducers, createStore, Store } from 'redux'
import { projectCardReducer, ProjectCardState } from '@store/projects'

/**
 * Top-level state
 */
export interface ApplicationState {
  projects: ProjectCardState
}

/**
 * Root reducer
 */
const createRootReducer = combineReducers({
  projects: projectCardReducer
})

/**
 * Root saga
 */

/**
  * Global store
  */
const store: Store<ApplicationState> = createStore(createRootReducer)

export default store
