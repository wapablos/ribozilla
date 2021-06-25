import React, { useState, useEffect } from 'react'
import { WorkspaceButton, SetupProjectCard, ProjectCard } from '@components/WorkspaceSetup'
import { WorkspaceWrapper } from '@components/WorkspaceSetup/styles'
import { FiPlus } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '@store/.'
import { toggleProjectCard } from '@components/WorkspaceSetup/internals'
import { SnackbarProvider } from 'notistack'
import { projectActions } from '@store/projects'
import { ProjectsEvents } from '@constants/events'

export default function Projects() {
  const dispatch = useDispatch()
  const { toggleCard, recentProjects } = useSelector<ApplicationState, ApplicationState['projects']>((state) => state.projects)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    window.electron.ipcRenderer.once(ProjectsEvents.UPDATE, () => { setUpdate(!update) })
    dispatch(projectActions.loadProjects())
    dispatch(projectActions.createNewProject(false))
  }, [update])

  return (
    <SnackbarProvider maxSnack={1} autoHideDuration={2200} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      <WorkspaceWrapper>
        {toggleCard ? <SetupProjectCard /> : <WorkspaceButton label="New Project" icon={<FiPlus />} onClick={toggleProjectCard(true)} /> }
        {recentProjects.map(({ id, name, description, path, file }) => <ProjectCard id={id} name={name} description={description} path={path} file={file} key={`proj-${id}`} />)}
      </WorkspaceWrapper>
    </SnackbarProvider>
  )
}
