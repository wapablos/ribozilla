import { createStyles, withStyles, Theme } from '@material-ui/core/styles'
import { AppBar } from '@material-ui/core'
import { toolbarHeight } from '@constants/themes'

const styles = (theme : Theme) => createStyles({
  root: {
    height: toolbarHeight,
    backgroundColor: 'red',
    top: 'auto',
    bottom: 0,
    zIndex: theme.zIndex.drawer + 1
  }
})

const StyledStatusbar = withStyles(styles)(AppBar)

export default StyledStatusbar
