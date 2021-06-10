import { call, put } from 'redux-saga/effects'
import { PipelineEvents, ProjectsEvents } from '@constants/events'
import { projectActions } from '.'

export function* loadRecentProjects() {
  try {
    const recents = yield window.electron.ipcRenderer.invoke(ProjectsEvents.GET_RECENTS).then((res) => res)
    yield put(projectActions.loadProjectsSuccess(recents))
  } catch (error) {
    console.log('Errr')
    yield put(projectActions.loadProjectsFailure())
  }
}
