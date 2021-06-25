import { put } from 'redux-saga/effects'
import { PipelineEvents } from '@constants/events'
import { extensionsActions } from '.'

export function* loadExtensions() {
  try {
    const extensions = yield window.electron.ipcRenderer.invoke(PipelineEvents.GET_EXTENSIONS).then((res) => res)
    yield put(extensionsActions.loadSuccess(extensions))
  } catch (error) {
    yield put(extensionsActions.loadFailure())
  }
}
