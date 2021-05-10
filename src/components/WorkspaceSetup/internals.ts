import { useDispatch } from 'react-redux'
import { projectActions } from '@store/projects'

export function toggleProjectCard(toggle:boolean) {
  const dispatch = useDispatch()
  return () => dispatch(projectActions.createNewProject(toggle))
}
