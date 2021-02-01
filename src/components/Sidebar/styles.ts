import { createStyles, withStyles } from '@material-ui/core/styles'
import { Drawer } from '@material-ui/core'

import { titlebarHeight } from '@components/Titlebar/styles'

const drawerWidth = 120

const SidebarMuiStyles = createStyles({
  root: {
    flexShrink: 0,
    width: drawerWidth
  },
  paper: {
    top: titlebarHeight,
    width: drawerWidth
  }
})

const StyledSidebar = withStyles(SidebarMuiStyles)(Drawer)

export { StyledSidebar }
