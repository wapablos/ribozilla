import { createStyles, withStyles, Theme } from '@material-ui/core/styles'
import { AppBar } from '@material-ui/core'
import { toolbarHeight } from '@constants/themes'

const styles = (theme : Theme) => createStyles({
  root: {
    height: toolbarHeight,
    zIndex: theme.zIndex.drawer + 1
  }
})

const StyledAppBar = withStyles(styles)(AppBar)

export default StyledAppBar
