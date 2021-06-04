import { useDispatch } from 'react-redux'
import { projectActions } from '@store/projects'

export function toggleProjectCard(toggle:boolean) {
  const dispatch = useDispatch()
  return () => dispatch(projectActions.createNewProject(toggle))
}

export function handleState<T>(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, info: T, dispatch: React.Dispatch<React.SetStateAction<T>>) {
  event.preventDefault()
  const { id, value } = event.target
  dispatch({ ...info, [id]: value })
}
