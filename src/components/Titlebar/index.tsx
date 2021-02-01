import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc'
import { MenuBar, IREWMenu } from 'react-electron-window-menu'

// FIX: Drag on macOs
import { AppEvents } from '@constants/events'
import {
  StyledTitleBar, ToolbarContainer, StyledIconButton,
  AppMenuContainer, WindowControlsContainer, WindowTitleContainer,
  ProjectTitleContainer
} from './styles'
import './styles.css'

function WindowControls() {
  const handleAppQuit = () => window.electron.send(AppEvents.QUIT)

  return (
    <WindowControlsContainer>

      <StyledIconButton disableRipple size="small">
        <VscChromeMinimize />
      </StyledIconButton>

      <StyledIconButton disableRipple size="small">
        <VscChromeMaximize />
      </StyledIconButton>

      <StyledIconButton disableRipple size="small" id="cancel" onClick={handleAppQuit}>
        <VscChromeClose />
      </StyledIconButton>

    </WindowControlsContainer>
  )
}

function AppMenu() {
  const menu: IREWMenu.IMenuItem[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open'

        },
        {
          label: 'Save',
          accelerator: 'Ctrl + S'
        }]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About'
        }
      ]
    }
  ]

  return (
    <AppMenuContainer>
      <MenuBar items={menu} />
    </AppMenuContainer>
  )
}

function ProjectTitle() {
  return (
    <ProjectTitleContainer>
      No Project
    </ProjectTitleContainer>
  )
}

function WindowTitle() {
  return (
    <WindowTitleContainer>
      Ribozilla
    </WindowTitleContainer>
  )
}

export default function TitleBar() {
  return (
    <StyledTitleBar>
      <ToolbarContainer>
        <WindowTitle />
        <AppMenu />
        <ProjectTitle />
        <WindowControls />
      </ToolbarContainer>
    </StyledTitleBar>
  )
}
