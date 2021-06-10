import { combineReducers, createStore, Store, applyMiddleware } from 'redux'
import { ExtensionsState, extensionsReducer, ExtensionsActionTypes, loadExtensions } from '@store/extensions'
import { NodesState, nodesReducer } from '@store/nodes'
import { ProjectState, projectsReducer, ProjectActionTypes, loadRecentProjects } from '@store/projects'
import { all, takeLatest, takeEvery } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
/**
 * Top-level state
 */
export interface ApplicationState {
  extensions: ExtensionsState,
  nodes: NodesState,
  projects: ProjectState
}

/**
 * Root reducer
 */
const createRootReducer = combineReducers<ApplicationState>({
  extensions: extensionsReducer,
  nodes: nodesReducer,
  projects: projectsReducer
})

/**
 * Root saga
*/
function* rootSaga() {
  return yield all([
    takeLatest(ExtensionsActionTypes.LOAD_REQUEST, loadExtensions),
    takeLatest(ProjectActionTypes.REQ_PROJECTS, loadRecentProjects)
  ])
}

const sagaMiddleware = createSagaMiddleware()

/**
 * Global store
 */
const store: Store<ApplicationState> = createStore(createRootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store
