import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { GiTestTubes } from 'react-icons/gi'
import { SiGooglesearchconsole, SiNodeRed, SiGnubash } from 'react-icons/si'

import { GoMortarBoard, GoGear } from 'react-icons/go'
import { CgArrowsExchange } from 'react-icons/cg'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { HiClipboardCheck } from 'react-icons/hi'
import { BaseTheme } from '@constants/themes'
import { isDevelopment } from '@constants/environment'
import { GlobalStyle } from '@constants/styles'
import Sidebar, { Routes, ISidebar } from '@components/Sidebar'
import Titlebar from '@components/Titlebar'
import SystemInfo from '@screens/systeminfo'
import Pipeline from '@screens/pipeline'
import Projects from '@screens/projects'
import { WorkspaceLayout } from './styles'
import { toggleDevTools } from './internals'

const main: ISidebar['tasks'] = [
  { id: 'hosts', title: 'Hosts', href: '', icon: CgArrowsExchange },
  { id: 'projects', title: 'Projects', href: '/projects', icon: GiTestTubes, component: Projects },
  { id: 'pipelines', title: 'Pipelines', href: '/pipelines', icon: SiNodeRed, component: Pipeline },
  { id: 'analysis', title: 'Toolbox', href: '/analysis', icon: SiGooglesearchconsole }
]

const extras: ISidebar['tasks'] = [
  { id: 'learn', title: 'Learn', icon: GoMortarBoard },
  { id: 'settings', title: 'Settings', icon: GoGear }
]

if (isDevelopment) {
  main.push(
    { id: 'sysinfo', title: 'System Info', href: '/sysinfo', icon: AiFillQuestionCircle, component: SystemInfo },
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
