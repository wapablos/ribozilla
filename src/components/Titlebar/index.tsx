import React from 'react'
import { MenuBar, IREWMenu } from 'react-electron-window-menu'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/vsc'
import sharedOptions from '@electron/menu/shared'
import { IconButtonProps } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { WindowControlsEvents } from '@constants/events'
import { titlebarActions } from '@store/titlebar'
import { ApplicationState } from '@store/.'
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
  const { isMaximized } = useSelector<ApplicationState, ApplicationState['titlebar']>((state) => state.titlebar)

  const windowActions = {
    maximize: async () => {
      window.electron.ipcRenderer.send(WindowControlsEvents.MAXIMIZE)
      await window.electron.ipcRenderer.on(WindowControlsEvents.MAXIMIZE, (evt, res) => {
        dispatch(titlebarActions.maxWindow(res))
        window.electron.ipcRenderer.removeAllListeners(WindowControlsEvents.MAXIMIZE)
      })
    },
    minimize: () => window.electron.ipcRenderer.send(WindowControlsEvents.MINIMIZE),
    close: () => window.electron.ipcRenderer.send(WindowControlsEvents.CLOSE)
  }

  return (
    <WindowControlsContainer>
      <ControlButton icon={VscChromeMinimize} onClick={windowActions.minimize} />
      <ControlButton icon={isMaximized ? VscChromeRestore : VscChromeMaximize} onClick={windowActions.maximize} />
      <ControlButton className="close" icon={VscChromeClose} onClick={windowActions.close} />
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
