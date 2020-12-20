/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react'
import ReactDOM, { render } from 'react-dom'
import { IoIosAdd } from 'react-icons/io'
import { MuiThemeProvider } from '@material-ui/core/styles'
import {
  StandardTextFieldProps, CardContent, FormControl,
  CardActions, CardHeader, CardMedia, Grid, Snackbar
} from '@material-ui/core'
import { SnackbarProvider, useSnackbar } from 'notistack'

import { IReadWrite } from '@constants/interfaces'
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
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const [projectData, setProjectData] = useState<IProjectData>({
    id: '', name: '', description: '', projectPath: ''
  })

  const [showStatus, setShowStatus] = useState<boolean>(false)

  const handleProjectData = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInfo(e, projectData, setProjectData)
  }

  // REVIEW: Checar se o evento fica escutando depois que cancela o file browser
  const handleProjectFolder = async () => {
    window.electron.send(FileBrowserEvents.CHOOSE_DIR)
    window.electron.on(FileBrowserEvents.PROJECT_PATH, (event, args) => {
      window.electron.removeAllListeners(FileBrowserEvents.PROJECT_PATH)
      if (args !== undefined) {
        setProjectData({ ...projectData, projectPath: args[0] })
      }
    })
  }

  const handleSaveProject = async () => {
    window.electron.send(ReadWriteEvents.WRITE_FILE_NEW, projectData)

    window.electron.on(ReadWriteEvents.WRITE_FILE_STATUS, (event, { status, message }: IReadWrite) => {
      removeProjectListeners()
      enqueueSnackbar(message, { variant: status, style: { whiteSpace: 'pre-line' } })
      if (status === 'success') {
        dispatch(projectActions.createNewProject(false))
      }
    })
  }

  const removeProjectListeners = () => {
    window.electron.removeAllListeners(FileBrowserEvents.PROJECT_PATH)
    window.electron.removeAllListeners(ReadWriteEvents.WRITE_FILE_NEW)
    window.electron.removeAllListeners(ReadWriteEvents.WRITE_FILE_STATUS)
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
        </StyledCard>
      </FormControl>
    </MuiThemeProvider>
  )
}

function ProjectCard({ name, description }:Partial<IProjectData>) {
  return (
    <MuiThemeProvider theme={themeMini}>
      <FormControl>
        <StyledCard>
          <CardHeader title={name} />
          <CardContent>
            <ZillaInput
              InputProps={{ style: { minHeight: 20 } }}
              multiline
              disabled
              value={description}
            />
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
  const [update, setUpdate] = useState<boolean>(false)

  window.electron.on(ProjectsEvents.UPDATE, () => {
    setUpdate(!update)
  })

  useEffect(() => {
    const fetchProject = async () => {
      window.electron.send(ProjectsEvents.REQUEST)
      const res = await getProjects()
      console.log('Projects: ', res)
      if (res !== undefined) setProjects(res.reverse())
    }
    fetchProject()
  }, [update])

  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={2200}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {console.log('Card: ', toggle)}
        <StyledBox>

          { toggle
            ? <NewProjectCard />
            : <StyledButton startIcon={<IoIosAdd />} onClick={toggleProjectCard(true)}>  New Project </StyledButton>}

          {projects === undefined
            ? <></>
            : projects.map(({ name, description }) => (
              <ProjectCard name={name} description={description} />
            ))}

        </StyledBox>
      </SnackbarProvider>
    </MuiThemeProvider>
  )
}
