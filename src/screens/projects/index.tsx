/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { MuiThemeProvider } from '@material-ui/core/styles'
import {
  StandardTextFieldProps, CardContent, FormControl,
  CardActions, CardHeader, CardMedia, Grid
} from '@material-ui/core'

import { FileBrowserEvents, ReadWriteEvents, ProjectsEvents } from '@constants/events'
import { useSelector, useDispatch } from 'react-redux'
import { ProjectCardState, projectActions } from '@store/projects'
import { ApplicationState } from '@store'
import {
  theme, themeMini, StyledBox, StyledButton, StyledCard,
  StyledInput, StyledMiniButton, StyledMiniGrid
} from './styles'
import getProjects, { handleInfo, toggleProjectCard } from './internals'

interface IZillaInput extends StandardTextFieldProps {
  label?: string,
  miniButtonLabel?: string
  miniButtonAction?: () => void
}

export interface IProjectData {
  id: string
  name: string
  description?: string
  projectPath?: string
}

function ZillaInput({
  label, miniButtonLabel, miniButtonAction, placeholder, id, ...props
}: IZillaInput) {
  return (
    <StyledMiniGrid item>
      {label}
      <StyledInput id={id} placeholder={placeholder} {...props} />
      { miniButtonLabel
        ? <StyledMiniButton onClick={miniButtonAction}>{miniButtonLabel}</StyledMiniButton>
        : null }
    </StyledMiniGrid>
  )
}

function NewProjectCard() {
  const [projectData, setProjectData] = useState({} as IProjectData)

  const handleProjectData = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInfo(e, projectData, setProjectData)
  }

  const handleProjectFolder = async () => {
    window.electron.send(FileBrowserEvents.CHOOSE_DIR)
    window.electron.on(FileBrowserEvents.PROJECT_PATH, (event, args) => {
      setProjectData({ ...projectData, projectPath: args[0] })
    })
  }

  const handleSaveProject = async () => {
    window.electron.send(ReadWriteEvents.WRITE_FILE_NEW, projectData)
  }

  return (
    <MuiThemeProvider theme={themeMini}>
      <FormControl>
        <StyledCard>
          <CardContent>
            <Grid>
              <ZillaInput required id="name" label="Name" placeholder="Meu projeto" value={projectData.name} onChange={handleProjectData} />
              <ZillaInput
                id="description"
                label="Description"
                placeholder="Projeto de análise de DNA"
                value={projectData.description}
                onChange={handleProjectData}
              />
              <ZillaInput
                required
                disabled
                id="projectPath"
                label="Project Path"
                miniButtonLabel="Browser"
                miniButtonAction={handleProjectFolder}
                placeholder="/usr/proj/folder"
                value={projectData.projectPath}
                onChange={handleProjectData}
              />
            </Grid>
          </CardContent>
          <CardActions>
            <StyledMiniButton onClick={handleSaveProject}>Save</StyledMiniButton>
            <StyledMiniButton onClick={toggleProjectCard(false)}>Cancel</StyledMiniButton>
          </CardActions>
          {JSON.stringify(projectData)}
        </StyledCard>
      </FormControl>
    </MuiThemeProvider>
  )
}

function ProjectCard() {
  return (
    <MuiThemeProvider theme={themeMini}>
      <FormControl>
        <StyledCard>
          <CardHeader title="Project Name" />
          <CardContent>
            <ZillaInput InputProps={{ style: { minHeight: 20 } }} multiline disabled value="Meu superprojeto que vai ser o máximo" />
          </CardContent>
          <CardMedia title="Pipeline preview" image="a" />
          <CardActions>
            <StyledMiniButton>Abrir</StyledMiniButton>
            <StyledMiniButton>Deletar</StyledMiniButton>
          </CardActions>
        </StyledCard>
      </FormControl>
    </MuiThemeProvider>
  )
}

export default function Projects() {
  const { toggle } = useSelector<ApplicationState, ApplicationState['projects']>((state) => state.projects)

  const [projects, setProjects] = useState([] as IProjectData[])

  useEffect(() => {
    const fetchProject = async () => {
      window.electron.send(ProjectsEvents.REQUEST, 'projects')
      const res = await getProjects()
      console.log('Projects: ', res)
    }
    fetchProject()
  })

  return (
    <MuiThemeProvider theme={theme}>
      {console.log('Card: ', toggle)}
      <StyledBox>
        <ProjectCard />
        { toggle
          ? <NewProjectCard />
          : <StyledButton startIcon={<IoIosAdd />} onClick={toggleProjectCard(true)}>  New Project </StyledButton>}
      </StyledBox>
    </MuiThemeProvider>
  )
}
