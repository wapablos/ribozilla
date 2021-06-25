import { call, put, select } from 'redux-saga/effects'
import { PipelineEvents, ProjectsEvents, ReadWriteEvents } from '@constants/events'
import { useSelector } from 'react-redux'
import { ApplicationState } from '@store/.'
import { IProjectData } from '@constants/interfaces'
import { systemActions } from '.'

export function* writeProjectToDisk() {
  try {
    const { nodes }: ApplicationState['nodes'] = yield select((state: ApplicationState) => state.nodes)
    const { currentProject }: ApplicationState['system'] = yield select((state: ApplicationState) => state.system)
    console.log(nodes)

    const data: IProjectData = {
      path: currentProject.currentPath,
      nodes
    }

    const write = yield window.electron.ipcRenderer.invoke(ReadWriteEvents.WRITE_PROJECT, data).then((res) => res)

    console.log(write)
    yield put(systemActions.writeProjectSuccess())
  } catch (error) {
    console.log('Error on write files')
    yield put(systemActions.writeProjectError())
  }
}
