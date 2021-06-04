import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { GiTestTubes, GiToolbox } from 'react-icons/gi'
import { SiNodeRed, SiGnubash } from 'react-icons/si'
import { BsLayoutWtf, BsGridFill } from 'react-icons/bs'
import { GoMortarBoard, GoGear } from 'react-icons/go'
import { BaseTheme } from '@constants/themes'
import { isDevelopment, isMac } from '@constants/environment'
import { GlobalStyle } from '@constants/styles'
import Sidebar, { Routes, ISidebar } from '@components/Sidebar'
import Titlebar from '@components/Titlebar'
import Pipeline from '@screens/pipeline'
import Projects from '@screens/projects'
import { WorkspaceLayout } from './styles'
import { toggleDevTools } from './internals'

const main: ISidebar['tasks'] = [
  // { id: 'hosts', title: 'Hosts', href: '', icon: CgArrowsExchange },
  { id: 'projects', title: 'Projects', href: '/projects', icon: BsGridFill, component: Projects },
  { id: 'pipelines', title: 'Pipelines', href: '/pipelines', icon: SiNodeRed, component: Pipeline },
  { id: 'analysis', title: 'Toolbox', href: '/analysis', icon: GiToolbox }
]

const extras: ISidebar['tasks'] = [
  { id: 'learn', title: 'Learn', icon: GoMortarBoard, href: '/docs' },
  { id: 'settings', title: 'Settings', icon: GoGear }
]

if (isDevelopment) {
  main.push(
    // { id: 'sysinfo', title: 'System Info', href: '/sysinfo', icon: AiFillQuestionCircle, component: SystemInfo },
    { id: 'devtools', title: 'DevTools', icon: SiGnubash, onClick: toggleDevTools }
  )
}

export default function Workspace() {
  return (
    <ThemeProvider theme={BaseTheme}>
      <GlobalStyle />
      <WorkspaceLayout>
        {isMac && isDevelopment ? <Titlebar /> : <></>}
        <Sidebar main={main} extras={extras} />
        <Routes main={main} extras={extras} />
      </WorkspaceLayout>
    </ThemeProvider>
  )
}
