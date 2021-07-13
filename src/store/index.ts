import { combineReducers, createStore, Store, applyMiddleware } from 'redux'
import { ExtensionsState, extensionsReducer, ExtensionsActionTypes, loadExtensions } from '@store/extensions'
import { NodesState, nodesReducer } from '@store/nodes'
import { ProjectState, projectsReducer, ProjectActionTypes, loadRecentProjects } from '@store/projects'
import { ProjectDataState, projectDataReducer, SystemActionTypes, writeProjectToDisk, readProjectFromDisk, systemActions } from '@store/system'
import { GithubServiceState, servicesActions, githubExtensionsReducer, GithubServiceActionTypes, fetchExtensionsfromGithub } from '@store/services'
import { all, takeLatest, takeEvery } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

/**
 * Top-level state
 */
export interface ApplicationState {
  extensions: ExtensionsState,
  nodes: NodesState,
  projects: ProjectState,
  system: ProjectDataState,
  githubApi: GithubServiceState
}

/**
 * Root reducer
 */
const createRootReducer = combineReducers<ApplicationState>({
  extensions: extensionsReducer,
  nodes: nodesReducer,
  projects: projectsReducer,
  system: projectDataReducer,
  githubApi: githubExtensionsReducer
})

/**
 * Root saga
*/
function* rootSaga() {
  return yield all([
    takeLatest(ExtensionsActionTypes.LOAD_REQUEST, loadExtensions),
    takeLatest(ProjectActionTypes.REQ_PROJECTS, loadRecentProjects),
    takeLatest(SystemActionTypes.WRITE_REQ, writeProjectToDisk),
    takeLatest(SystemActionTypes.LOAD_FILES, readProjectFromDisk),
    takeLatest(GithubServiceActionTypes.GITHUB_LOAD_REQUEST, fetchExtensionsfromGithub)
  ])
}

const sagaMiddleware = createSagaMiddleware()

/**
 * Global store
 */
const store: Store<ApplicationState> = createStore(createRootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

export default store
