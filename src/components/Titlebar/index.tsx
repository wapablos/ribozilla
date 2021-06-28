import React, { useState, useEffect } from 'react'
import { MenuBar, IREWMenu } from 'react-electron-window-menu'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore, VscCircleFilled } from 'react-icons/vsc'
import { sharedOptions } from '@electron/menu/shared'
import { IconButtonProps } from '@material-ui/core'
import { WindowControlsEvents, ReadWriteEvents } from '@constants/events'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '@store/.'
import { useSnackbar } from 'notistack'
import { systemActions } from '@store/system'
import { isMac } from '@constants/environment'
import { StyledAppBar, MenuBarContainer, MenubarStyles, WindowControlsContainer, StyledIconButton } from './styles'

interface ITitleText extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  icon?: React.ReactNode
}

function TitleText({ text, icon, ...props } : ITitleText) {
  return (
    <div {...props} style={{ display: 'flex', alignItems: 'center' }}>
      {text}
      {icon}
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
  const [isMaximized, setIsMaximized] = useState<boolean>(null)

  const windowActions = {
    maximize: async () => {
      window.electron.ipcRenderer.send(WindowControlsEvents.MAXIMIZE)
      await window.electron.ipcRenderer.on(WindowControlsEvents.MAXIMIZE, (evt, res) => {
        setIsMaximized(res)
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
  const dispatch = useDispatch()
  const { update } = useSelector<ApplicationState, ApplicationState['nodes']>((state) => state.nodes)
  const { currentProject } = useSelector<ApplicationState, ApplicationState['system']>((state) => state.system)

  return (
    <MenuBarContainer>
      <TitleText text="Ribozilla" className="app-name" />
      <MenuBar items={sharedOptions} />
      <TitleText text={currentProject.name || 'No Project'} icon={update ? <VscCircleFilled /> : null} className="project-title" />
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
