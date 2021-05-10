import React from 'react'
import { WorkspaceButton, SetupProjectCard, ProjectCard } from '@components/WorkspaceSetup'
import { WorkspaceWrapper } from '@components/WorkspaceSetup/styles'
import { FiPlus } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { ApplicationState } from '@store/.'
import { toggleProjectCard } from '@components/WorkspaceSetup/internals'

export default function Projects() {
  const { toggleCard } = useSelector<ApplicationState, ApplicationState['projects']>((state) => state.projects)

  return (
    <WorkspaceWrapper>
      {toggleCard ? <SetupProjectCard /> : <WorkspaceButton label="Add Project" icon={<FiPlus />} onClick={toggleProjectCard(true)} /> }
      <ProjectCard />
    </WorkspaceWrapper>
  )
}
