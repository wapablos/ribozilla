import { put } from 'redux-saga/effects'
import { PipelineEvents } from '@constants/events'
import { servicesActions } from '.'

export function* fetchExtensionsfromGithub() {
  try {
    const extensions = yield window.electron.ipcRenderer.invoke(PipelineEvents.GET_EXTENSIONS_FROM_GITHUB).then((res) => res)
    yield put(servicesActions.githubLoadSuccess(extensions))
  } catch (error) {
    yield put(servicesActions.githubLoadFailure())
  }
}
