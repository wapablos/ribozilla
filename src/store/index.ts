import { combineReducers, createStore, Store } from 'redux'
import { projectCardReducer, ProjectCardState } from '@store/projects'
import { pipelineReducer, PipelineState } from '@store/pipeline'

/**
 * Top-level state
 */
export interface ApplicationState {
  projects: ProjectCardState
  pipeline: PipelineState
}

/**
 * Root reducer
 */
const createRootReducer = combineReducers({
  projects: projectCardReducer,
  pipeline: pipelineReducer
})

/**
 * Root saga
 */

/**
  * Global store
  */
const store: Store<ApplicationState> = createStore(createRootReducer)

export default store
