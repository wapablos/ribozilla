import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { GiTestTubes } from 'react-icons/gi'
import { IoMdAnalytics } from 'react-icons/io'
import { SiNodeRed, SiGnubash } from 'react-icons/si'
import { GoMortarBoard, GoGear } from 'react-icons/go'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { BaseTheme } from '@constants/themes'
import { isDevelopment } from '@constants/environment'
import { GlobalStyle } from '@constants/styles'
import Sidebar, { Routes, ISidebar } from '@components/Sidebar'
import Titlebar from '@components/Titlebar'
import SystemInfo from '@screens/systeminfo'
import { WorkspaceLayout } from './styles'
import { toggleDevTools } from './internals'

const main: ISidebar['tasks'] = [
  { id: 'projects', title: 'Projects', href: '/projects', icon: GiTestTubes },
  { id: 'pipelines', title: 'Pipelines', href: '/pipelines', icon: SiNodeRed },
  { id: 'analysis', title: 'Data Analysis', href: '/analysis', icon: IoMdAnalytics }
]

const extras: ISidebar['tasks'] = [
  { id: 'learn', title: 'Learn', icon: GoMortarBoard },
  { id: 'settings', title: 'Settings', icon: GoGear }
]

if (isDevelopment) {
  main.push(
    { id: 'sysinfo', title: 'System Info', icon: AiFillQuestionCircle, href: '/sysinfo', component: SystemInfo },
    { id: 'devtools', title: 'DevTools', icon: SiGnubash, onClick: toggleDevTools }
  )
}

export default function Workspace() {
  return (
    <ThemeProvider theme={BaseTheme}>
      <GlobalStyle />
      <WorkspaceLayout>
        <Titlebar />
        <Sidebar main={main} extras={extras} />
        <Routes main={main} extras={extras} />
      </WorkspaceLayout>
    </ThemeProvider>
  )
}
