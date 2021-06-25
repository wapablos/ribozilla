import { put, select } from 'redux-saga/effects'
import { ReadWriteEvents } from '@constants/events'
import { ApplicationState } from '@store/.'
import { IProjectData } from '@constants/interfaces'
import { systemActions } from '.'

export function* writeProjectToDisk() {
  try {
    const { nodes }: ApplicationState['nodes'] = yield select((state: ApplicationState) => state.nodes)
    const { currentProject }: ApplicationState['system'] = yield select((state: ApplicationState) => state.system)

    const data: IProjectData = {
      path: currentProject.currentPath,
      nodes
    }

    const wasWritten = yield window.electron.ipcRenderer.invoke(ReadWriteEvents.WRITE_PROJECT, data).then((res) => res)

    switch (wasWritten) {
      case false:
        yield put(systemActions.writeProjectError())
        break
      default:
        yield put(systemActions.writeProjectSuccess())
        break
    }
  } catch (error) {
    console.log('(Error)', error)
    yield put(systemActions.writeProjectError())
  }
}
