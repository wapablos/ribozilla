import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { GoMortarBoard, GoGear } from 'react-icons/go'
import { SiNodeRed, SiGnubash } from 'react-icons/si'
import { BsGridFill } from 'react-icons/bs'
import { GiToolbox } from 'react-icons/gi'
import { MdExtension } from 'react-icons/md'
import { isDevelopment, isWindows, isLinux, isMac } from '@constants/environment'
import { GlobalStyle } from '@constants/styles'
import { BaseTheme } from '@constants/themes'
import Sidebar, { Routes, ISidebar } from '@components/Sidebar'
import Statusbar from '@components/Statusbar'
import Titlebar from '@components/Titlebar'
import Pipeline from '@screens/pipeline'
import Projects from '@screens/projects'
import { SnackbarProvider } from 'notistack'
import Toolbox from '@screens/toolbox'
import Extensions from '@screens/extensions'
import { toggleDevTools } from './internals'
import { WorkspaceLayout } from './styles'

const hasProj = true
const main: ISidebar['tasks'] = [
  /* { id: 'hosts', title: 'Hosts', href: '', icon: CgArrowsExchange } */
  { id: 'projects', title: 'Projects', href: '/projects', icon: BsGridFill, component: Projects },
  { id: 'pipelines', title: 'Pipelines', href: '/pipelines', icon: SiNodeRed, component: Pipeline, hasProj },
  { id: 'analysis', title: 'Toolbox', href: '/toolbox', icon: GiToolbox, component: Toolbox, hasProj }
]

const extras: ISidebar['tasks'] = [
  /* { id: 'learn', title: 'Learn', icon: GoMortarBoard, href: '/docs' },
  { id: 'settings', title: 'Settings', icon: GoGear } */
  { id: 'extensions', title: 'Extensions', href: '/extensions', icon: MdExtension, component: Extensions }
]

if (isDevelopment) {
  main.push(
    /* { id: 'sysinfo', title: 'System Info', href: '/sysinfo', icon: AiFillQuestionCircle, component: SystemInfo } */
    { id: 'devtools', title: 'DevTools', icon: SiGnubash, onClick: toggleDevTools }
  )
}

export default function Workspace() {
  return (
    <ThemeProvider theme={BaseTheme}>
      <GlobalStyle />
      <SnackbarProvider maxSnack={1} autoHideDuration={2200} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <WorkspaceLayout>
          { (isWindows || isLinux || isDevelopment) && <Titlebar />}
          <Sidebar main={main} extras={extras} />
          <Routes main={main} extras={extras} />
          <Statusbar />
        </WorkspaceLayout>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
