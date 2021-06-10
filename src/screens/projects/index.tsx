import React, { useState, useEffect } from 'react'
import { WorkspaceButton, SetupProjectCard, ProjectCard } from '@components/WorkspaceSetup'
import { WorkspaceWrapper } from '@components/WorkspaceSetup/styles'
import { FiPlus } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '@store/.'
import { toggleProjectCard } from '@components/WorkspaceSetup/internals'
import { SnackbarProvider } from 'notistack'
import { projectActions } from '@store/projects'

export default function Projects() {
  const dispatch = useDispatch()
  const { toggleCard, recentProjects } = useSelector<ApplicationState, ApplicationState['projects']>((state) => state.projects)

  useEffect(() => {
    dispatch(projectActions.loadProjects())
  }, [])

  return (
    <SnackbarProvider maxSnack={1} autoHideDuration={2200} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      <WorkspaceWrapper>
        {toggleCard ? <SetupProjectCard /> : <WorkspaceButton label="New Project" icon={<FiPlus />} onClick={toggleProjectCard(true)} /> }
        {recentProjects.map(({ name, description }) => <ProjectCard name={name} description={description} />)}
      </WorkspaceWrapper>
    </SnackbarProvider>
  )
}
