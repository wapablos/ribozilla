import { createStyles, withStyles } from '@material-ui/core/styles'
import {
  AppBar, Toolbar, Box, IconButton
} from '@material-ui/core'

export const titlebarHeight = 30

const TitlebarMuiStyles = createStyles({
  root: {
    backgroundColor: '#3C3C3C',
    height: titlebarHeight,
    fontFamily: 'Helvetica',
    fontSize: '0.85em'
  }
})

export const StyledTitleBar = withStyles(TitlebarMuiStyles)(AppBar)

const ToolbarMuiStyles = createStyles({
  root: {
    minHeight: titlebarHeight,
    margin: 0,
    paddingRight: 0,
    paddingLeft: 10,
    '-webkit-app-region': 'drag'
  }
})

export const ToolbarContainer = withStyles(ToolbarMuiStyles)(Toolbar)

const WindowControlsStyles = createStyles({
  root: {
    display: 'flex',
    right: 0,
    marginLeft: '5%',
    '-webkit-app-region': 'no-drag'
  }
})

export const WindowControlsContainer = withStyles(WindowControlsStyles)(Box)

const IconButtonStyles = createStyles({
  root: {
    borderRadius: 0,
    height: titlebarHeight,
    width: 46,
    color: '#CCCCCC',
    padding: '0 12px',
    cursor: 'default',

    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: '#FFFFFF1A'
    },

    '&#cancel:hover': {
      color: '#FFFFFF',
      backgroundColor: '#E81123',
      opacity: '90%'
    }
  }
})

export const StyledIconButton = withStyles(IconButtonStyles)(IconButton)

const AppMenuStyles = createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '1em',
    '-webkit-app-region': 'no-drag'

  }
})

export const AppMenuContainer = withStyles(AppMenuStyles)(Box)

const WindowTitleStyles = createStyles({
  root: {
    fontWeight: 600,
    padding: '0 10px',
    textAlign: 'center'
  }
})

export const WindowTitleContainer = withStyles(WindowTitleStyles)(Box)

const ProjectTitleStyles = createStyles({
  root: {
    fontWeight: 600,
    margin: 'auto',
    textAlign: 'center'
  }
})

export const ProjectTitleContainer = withStyles(ProjectTitleStyles)(Box)
