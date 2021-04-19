import React from 'react'
import { MenuBar, IREWMenu } from 'react-electron-window-menu'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc'
import sharedOptions from '@electron/menu/shared'
import { IconBaseProps } from 'react-icons/lib/cjs'
import { CommonProps } from '@material-ui/core/OverridableComponent'
import { IconButtonProps } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { titlebarActions } from '@store/titlebar'
import { StyledAppBar, MenuBarContainer, MenubarStyles, WindowControlsContainer, StyledIconButton } from './styles'

interface ITitleText extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

function TitleText({ text, ...props } : ITitleText) {
  return (
    <div {...props}>
      {text}
    </div>
  )
}

function ControlButton({ icon, ...props }: { icon?: any} & IconButtonProps) {
  return (
    <StyledIconButton {...props}>
      {React.createElement(icon || 'div')}
    </StyledIconButton>
  )
}

function WindowControls() {
  const dispatch = useDispatch()

  return (
    <WindowControlsContainer>
      <ControlButton icon={VscChromeMinimize} onClick={() => dispatch(titlebarActions.minWindow)} />
      <ControlButton icon={VscChromeMaximize} onClick={() => dispatch(titlebarActions.maxWindow)} />
      <ControlButton className="close" icon={VscChromeClose} onClick={() => dispatch(titlebarActions.closeWindow)} />
    </WindowControlsContainer>

  )
}
function AppMenu() {
  return (
    <MenuBarContainer>
      <TitleText text="Ribozilla" className="app-name" />
      <MenuBar items={sharedOptions} />
      <TitleText text="Project Title" className="project-title" />
      <WindowControls />
    </MenuBarContainer>
  )
}

export default function Titlebar() {
  return (
    <StyledAppBar>
      <MenubarStyles />
      <AppMenu />
    </StyledAppBar>
  )
}
