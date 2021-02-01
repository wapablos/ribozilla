import { createStyles, withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar } from '@material-ui/core'

export const statusBarHeight = 25

const StatusBarMuiStyles = createStyles({
  root: {
    backgroundColor: '#191A21',
    top: 'auto',
    bottom: 0,
    height: statusBarHeight,
    fontFamily: 'Helvetica',
    fontSize: '0.9em',
    fontWeight: 300
  }
})

export const StyledStatusbar = withStyles(StatusBarMuiStyles)(AppBar)

const ToolbarMuiStyles = createStyles({
  root: {
    minHeight: statusBarHeight,
    margin: 0,
    paddingRight: 0,
    paddingLeft: 10,

    '& > div.conn': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'black',
      backgroundColor: '#AAAAAA',
      padding: '0 10px',
      borderRadius: 10
    }
  }
})

export const ToolbarContainer = withStyles(ToolbarMuiStyles)(Toolbar)
