import styled from 'styled-components'
import PanelGroup from 'react-panelgroup'
import { List, ListItem, ListItemIcon } from '@material-ui/core'

const listColorPallete = {
  background: '#282A36',
  border: '#191A21',
  icon: '#6272A4'
}

export const StyledPanel = styled(PanelGroup).attrs({
  borderColor: '#DDDDDD',
  spacing: 2,
  panelWidths: [{ maxSize: 270, resize: 'dynamic' }]
})`
  width: 100%;
`
export const StyledList = styled(List).attrs({
  disablePadding: true
})`
  &.MuiList-root {
    width: 100%;
    background-color: ${listColorPallete.background};
    padding: 0 1px;
    font-family: --apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.7em;
    font-weight: 700;
  }

`

export const StyledListItemIcon = styled(ListItemIcon)`
  &.MuiListItemIcon-root {
    min-width: 0;
    padding-right: 4px;
  }
`

export const StyledListItem: typeof ListItem = styled(ListItem).attrs({
  button: true,
  disableGutters: true
})`
  &.MuiListItem-root {
    height: 24px;
    padding: 0 4px;
  }

  &.MuiListItem-button {
    color: #FFFFFF;
    background-color: #F4F4F41A;
    
    :hover {
      color: #FFFFFF;
      background-color: #F4F4F41A;
      outline: 1px solid #6272A4;
    }
  }
`

export const PipelineScreen = styled.div`
  max-height: 100%;
  width: 100%;
  min-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`
