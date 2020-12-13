import { createStyles, withStyles, Theme } from '@material-ui/core/styles'
import { Drawer } from '@material-ui/core'
import { drawerWidth } from '@constants/themes'

const styles = (theme: Theme) => createStyles({
  root: {
    flexShrink: 0,
    width: drawerWidth
  },
  paper: {
    width: drawerWidth
  }
})

const StyledDrawer = withStyles(styles)(Drawer)

export default StyledDrawer
