/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { MuiThemeProvider } from '@material-ui/core/styles'
import {
  StandardTextFieldProps, CardContent, FormControl,
  CardActions, CardHeader, CardMedia, Grid
} from '@material-ui/core'

import {
  theme, themeMini, StyledBox, StyledButton, StyledCard,
  StyledInput, StyledMiniButton, StyledMiniGrid
} from './styles'
import { handleInfo } from './internals'

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
  label, miniButtonLabel, miniButtonAction, placeholder, ...props
}: IZillaInput) {
  return (
    <StyledMiniGrid item>
      {label}
      <StyledInput id="input-with-icon-grid" placeholder={placeholder} {...props} />
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

  return (
    <MuiThemeProvider theme={themeMini}>
      <FormControl>
        <StyledCard>
          <CardContent>
            <Grid>
              <ZillaInput id="name" label="Name" placeholder="Meu projeto" value={projectData.name} onChange={handleProjectData} />
              <ZillaInput
                id="description"
                label="Description"
                placeholder="Projeto de análise de DNA"
                value={projectData.description}
                onChange={handleProjectData}
              />
              <ZillaInput
                id="projectPath"
                label="Project Path"
                miniButtonLabel="Browser"
                miniButtonAction={() => window.electron.send('choose-dir')}
                placeholder="/usr/proj/folder"
                value={projectData.projectPath}
                onChange={handleProjectData}
              />
            </Grid>
          </CardContent>
          <CardActions>
            <StyledMiniButton>Save</StyledMiniButton>
            <StyledMiniButton>Cancel</StyledMiniButton>
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
  return (
    <MuiThemeProvider theme={theme}>
      <StyledBox>
        <NewProjectCard />
        <StyledButton startIcon={<IoIosAdd />}>  New Project </StyledButton>
      </StyledBox>
    </MuiThemeProvider>
  )
}
