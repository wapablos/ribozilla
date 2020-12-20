import { createStyles, withStyles, Theme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const styles = (theme : Theme) => createStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexShrink: 1,
    zIndex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  }
})

const WorkspaceGrid = withStyles(styles)(Grid)

export default WorkspaceGrid
