import {
  createStyles, withStyles, createMuiTheme, Theme
} from '@material-ui/core/styles'
import { Grid, Paper, TextField } from '@material-ui/core'

const theme = createMuiTheme({
  props: {
    MuiPaper: {
      elevation: 10
    },
    MuiGrid: {
      spacing: 2
    }
  }
})

const gridStyles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1
  }
})

const paperStyles = (theme: Theme) => createStyles({
  root: {
    overflowY: 'auto',
    minWidth: 330,
    maxHeight: 240,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

const inputStyles = createStyles({
  root: {
    paddingInline: 8
  }
})

const StyledGrid = withStyles(gridStyles)(Grid)
const StyledPaper = withStyles(paperStyles)(Paper)
const StyledInput = withStyles(inputStyles)(TextField)

export {
  theme, StyledGrid, StyledPaper, StyledInput
}
