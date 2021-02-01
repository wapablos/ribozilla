import React from 'react'
import { ThemeProvider, Toolbar } from '@material-ui/core'

import { DevToolsEvents } from '@constants/events'
import { GlobalStyle } from '@constants/styles'
import { BaseTheme } from '@constants/themes'

import Sidebar, { ITask } from '@components/Sidebar'
import Statusbar from '@components/Statusbar'
import Titlebar from '@components/Titlebar'

import Projects from '@screens/projects'
import Pipeline from '@screens/pipeline'

import SystemInfo from '@screens/systeminfo'

import { WorkspaceLayout } from './styles'
import Routes from './routes'

const taskList: ITask[] = [
  { title: 'Projects', href: '/', component: Projects },
  { title: 'Pipelines', href: '/pipelines', component: Pipeline },
  { title: 'Learn', href: '?' },
  { title: 'System Info', href: '/sysinfo', component: SystemInfo },
  { title: 'DevTools', href: '?', onClick: () => window.electron.send(DevToolsEvents.TOOGLE) }
]

export default function Workspace() {
  return (
    <ThemeProvider theme={BaseTheme}>
      <GlobalStyle />
      <WorkspaceLayout>
        <Titlebar />
        <Sidebar tasks={taskList} />
        <Routes tasks={taskList} />
        <Statusbar />
      </WorkspaceLayout>
    </ThemeProvider>
  )
}
