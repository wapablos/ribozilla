import { useDispatch, useSelector } from 'react-redux'
import { projectActions } from '@store/projects'
import { ProjectsEvents } from '@constants/events'
import { IProjectData } from '.'

export function handleInfo<T>(event: React.ChangeEvent<HTMLInputElement>, info: T, dispatch: React.Dispatch<React.SetStateAction<T>>) {
  event.preventDefault()
  const { id, value } = event.target
  dispatch({ ...info, [id]: value })
}

export function toggleProjectCard(toggle:boolean) {
  const dispatch = useDispatch()
  return () => dispatch(projectActions.createNewProject(toggle))
}

export default async function getProjects(): Promise<IProjectData[]> {
  return new Promise((resolve, reject) => {
    window.electron.once(ProjectsEvents.RESPONSE, (event, projectData) => {
      window.electron.removeAllListeners(ProjectsEvents.RESPONSE)
      resolve(projectData)
    })
  })
}
