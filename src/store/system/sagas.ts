import { put, select } from 'redux-saga/effects'
import { ReadWriteEvents } from '@constants/events'
import { ApplicationState } from '@store/.'
import { IProjectData } from '@constants/interfaces'
import { PayloadAction } from 'typesafe-actions'
import { take } from 'lodash'
import { nodesActions } from '@store/nodes'
import { systemActions } from '.'
import { ProjectDataState, SystemActionTypes } from './types'

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
    console.log('(System Error)', error)
    yield put(systemActions.writeProjectError())
  }
}

export function* readProjectFromDisk({ payload }: PayloadAction<SystemActionTypes, ProjectDataState>) {
  const { currentProject } = payload
  try {
    const data: IProjectData = yield window.electron.ipcRenderer.invoke(ReadWriteEvents.READ_FILE, currentProject.currentPath).then((res) => res)
    yield put({ type: SystemActionTypes.SET_PROJECT, payload })
    console.log(data)
    yield put(nodesActions.loadNodes(data.nodes))
  } catch (error) {
    console.log('(System Error)', error)
    yield put(systemActions.writeProjectError())
  }
}
