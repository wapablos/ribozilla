import { combineReducers, createStore, Store, applyMiddleware } from 'redux'
import { ExtensionsState, extensionsReducer, ExtensionsActionTypes, loadExtensions } from '@store/extensions'
import { all, takeLatest } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
/**
 * Top-level state
 */
export interface ApplicationState {
  extensions: ExtensionsState
}

/**
 * Root reducer
 */
const createRootReducer = combineReducers<ApplicationState>({
  extensions: extensionsReducer
})

/**
 * Root saga
*/
function* rootSaga() {
  return yield all([
    takeLatest(ExtensionsActionTypes.LOAD_REQUEST, loadExtensions)
  ])
}

const sagaMiddleware = createSagaMiddleware()

/**
 * Global store
 */
const store: Store<ApplicationState> = createStore(createRootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store
