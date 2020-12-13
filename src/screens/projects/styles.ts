import { createStyles, withStyles, createMuiTheme } from '@material-ui/core/styles'
import {
  Button, Box, Card, TextField, Grid
} from '@material-ui/core'

const theme = createMuiTheme({
  props: {
    MuiButton: {
      variant: 'contained'
    }
  }
})

const themeMini = createMuiTheme({
  props: {
    MuiButton: {
      variant: 'contained',
      size: 'small',
      disableElevation: true
    },
    MuiTextField: {
      variant: 'outlined',
      InputProps: {
        style: {
          height: 20
        }
      }
    }
  }
})

const buttonStyles = createStyles({
  root: {
    height: 30
  }
})

const miniButtonStyles = createStyles({
  root: {
    height: 20
  }
})

const boxStyles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row'
  }
})

const cardStyles = createStyles({
  root: {
    marginRight: 10,
    flexWrap: 'nowrap'
  }
})

const inputStyles = createStyles({
  root: {
    paddingInline: 8
  }
})

const miniGridStyles = createStyles({
  root: {
    padding: 2
  }
})

const StyledMiniGrid = withStyles(miniGridStyles)(Grid)
const StyledMiniButton = withStyles(miniButtonStyles)(Button)
const StyledInput = withStyles(inputStyles)(TextField)
const StyledButton = withStyles(buttonStyles)(Button)
const StyledCard = withStyles(cardStyles)(Card)
const StyledBox = withStyles(boxStyles)(Box)

export {
  theme, themeMini, StyledButton, StyledBox,
  StyledCard, StyledInput, StyledMiniButton, StyledMiniGrid
}
