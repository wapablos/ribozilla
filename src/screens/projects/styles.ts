import { createStyles, withStyles, createMuiTheme } from '@material-ui/core/styles'
import {
  Button, Card, TextField, Grid
} from '@material-ui/core'
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'

const cardWidth = '250px'

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

const cardStyles = createStyles({
  root: {
    width: cardWidth,
    height: 300
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

const ProjectsScreen = styled(ScrollContainer)`
  display: grid;
  height: 100%;
  box-sizing: border-box;
  gap: 10px;
  grid-auto-flow: column;
  grid-auto-columns: ${cardWidth};
  cursor: grab;

:active {
  cursor: grabbing;
}
`
const StyledMiniGrid = withStyles(miniGridStyles)(Grid)
const StyledMiniButton = withStyles(miniButtonStyles)(Button)
const StyledInput = withStyles(inputStyles)(TextField)
const StyledButton = withStyles(buttonStyles)(Button)
const StyledCard = withStyles(cardStyles)(Card)

export {
  theme, themeMini, ProjectsScreen, StyledButton,
  StyledCard, StyledInput, StyledMiniButton, StyledMiniGrid
}
