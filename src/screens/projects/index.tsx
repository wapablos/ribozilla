import React, { useState, useEffect } from 'react'
import { WorkspaceButton, SetupProjectCard, ProjectCard } from '@components/WorkspaceSetup'
import { WorkspaceWrapper } from '@components/WorkspaceSetup/styles'
import { FiPlus } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '@store/.'
import { toggleProjectCard } from '@components/WorkspaceSetup/internals'
import { projectActions } from '@store/projects'
import { ProjectsEvents } from '@constants/events'
import { extensionsActions } from '@store/extensions'

export default function Projects() {
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(false)
  const { toggleCard, recentProjects } = useSelector<ApplicationState, ApplicationState['projects']>((state) => state.projects)
  const { extensions, success, error } = useSelector<ApplicationState, ApplicationState['extensions']>((state) => state.extensions)

  useEffect(() => {
    window.electron.ipcRenderer.once(ProjectsEvents.UPDATE, () => { setUpdate(!update) })
    dispatch(projectActions.loadProjects())
    dispatch(projectActions.createNewProject(false))
    if (!success || error) {
      console.log('(Software List) useEffect')
      dispatch(extensionsActions.loadRequest())
    }
  }, [update, success])

  return (
    <WorkspaceWrapper>
      {toggleCard ? <SetupProjectCard /> : <WorkspaceButton label="New Project" icon={<FiPlus />} onClick={toggleProjectCard(true)} /> }
      {recentProjects.map(({ id, name, description, path, file }) => <ProjectCard id={id} name={name} description={description} path={path} file={file} key={`proj-${id}`} />)}
    </WorkspaceWrapper>
  )
}
