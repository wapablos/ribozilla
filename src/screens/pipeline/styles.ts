import { createStyles, withStyles, createMuiTheme } from '@material-ui/core/styles'
import { Paper, ListItem } from '@material-ui/core'
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'

export const PipelineMuiTheme = createMuiTheme({
  props: {
    MuiPaper: {
      elevation: 0
    },
    MuiButtonBase: {
      disableRipple: true
    }
  }
})

const SoftwareListStyles = createStyles({
  root: {
    cursor: 'default'
  }
})

export const SoftwareList = withStyles(SoftwareListStyles)(ListItem)

const CommandListStyles = createStyles({
  root: {
    cursor: 'default'
  }
})

export const CommandList = withStyles(CommandListStyles)(ListItem)

export const PipelineScreen = styled.div`
  display: grid;
  height: 100%;
  gap: 12px;
  grid-template-rows: 1fr 1.6fr;
  overflow: hidden;
`
export const StyledContainer = styled.div`
  display: grid;
  max-height: 100%;
  width: 100%;
  min-width: 100%;
  box-sizing: border-box;
  grid-template-columns: 1fr 1.75fr;
  column-gap: 12px;
  overflow: hidden;
`

export const StyledCardList = styled(ScrollContainer)`
  display: grid;
  height: 100%;
  box-sizing: border-box;
  gap: 12px;
  grid-auto-flow: column;
  grid-auto-columns: 320px;
  overflow-x: auto;
  overflow-y: hidden;
  cursor: grab;

  :active {
    cursor: grabbing;
  }
`

export const StyledPaper = styled(Paper)`
  height: 100% - 5px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 5px;

  ::-webkit-scrollbar {
      width: 0.4em;
    }

  ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
    }

  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(0,0,0,.2);
      outline: 1px solid slategrey;
    }
`

export const NodeSurface = styled.div`
  height: 100%;
`
