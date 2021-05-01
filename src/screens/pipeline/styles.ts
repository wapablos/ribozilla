import styled, { StyledComponent } from 'styled-components'
import PanelGroup from 'react-panelgroup'
import { List, ListItem, ListItemIcon } from '@material-ui/core'
import { Mosaic } from 'react-mosaic-component'
import 'react-mosaic-component/react-mosaic-component.css'

const listColorPallete = {
  background: '#282A36',
  border: '#191A21',
  icon: '#6272A4'
}

export const StyledPanel = styled(PanelGroup).attrs({
  borderColor: '#DDDDDD',
  spacing: 2
})`
  width: 100%;
`

export const ListContainer = styled.div`
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  padding: 0 1px;
  background-color: ${listColorPallete.background};
`

export const StyledList = styled(List).attrs({
  disablePadding: true
})`
  &.MuiList-root {
    width: 100%;
    font-family: --apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.7em;
    font-weight: 700;
    max-height: 100%;
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

    &.software {
      background-color: transparent;
      padding-left: 20px;
      font-weight: 500;

      .mini-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #FFFFFF;
        margin-left: auto;
        :hover {
          color: #3CB371;
        }
      }
    }
  }
`

export const SurfaceDiv = styled.div`
  height: 100%;
  width: 100%;
`

export const PipelineScreen = styled.div`
  max-height: 100%;
  width: 100%;
  min-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`

export const StyledMosaic = styled(Mosaic).attrs({
  initialValue: {
    direction: 'row',
    first: 'softwares',
    second: {
      direction: 'column',
      first: 'workflow',
      second: 'cards'
    },
    splitPercentage: 25
  }
})`

  .mosaic-root {  
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #282a36;
  }

  .mosaic-tile {
    margin: 1px;
  }

  .mosaic-window {
    .mosaic-window-toolbar {
      box-shadow: 0;
      height: 22px;
      background: #2D2F3E;
      color: #ffffff;
      font-family:Helvetica;
      font-size: 0.7em;
      font-weight: 500;
    }

    .mosaic-window-title {
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mosaic-window-body {
      background: #dddddd;
    }
  }

  .mosaic-split {
    position: absolute;
    touch-action: none;
    background: #4D5268;

    &.-row {
      z-index: 1;
      margin-left: -1px;
      width: 2px;
      cursor: ew-resize;
    }

    &.-column {
      z-index: 0;
      margin-top: -1px;
      height: 2px;
      cursor: ns-resize;
    }

    &:hover {
      background: #717897;
    }
  }`
