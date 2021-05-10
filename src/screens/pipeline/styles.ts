import styled from 'styled-components'
import PanelGroup from 'react-panelgroup'
import { List, ListItem, ListItemIcon, Paper, Button, Divider, Switch } from '@material-ui/core'
import { Mosaic } from 'react-mosaic-component'
import 'react-mosaic-component/react-mosaic-component.css'

const listColorPallete = {
  background: '#282A36',
  border: '#191A21',
  icon: '#6272A4'
}

export const StyledMosaic = styled(Mosaic).attrs({
  initialValue: {
    direction: 'row',
    first: 'softwares',
    second: {
      direction: 'column',
      first: 'workflow',
      second: 'cards',
      splitPercentage: 45
    },
    splitPercentage: 20
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
      background: #eee;
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

export const TheDivider = styled(Divider)`
  &.MuiDivider-root {
    margin: 4px 0;
     background: #FFFFFF;
  }
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

export const StyledNode: typeof Paper = styled(Paper)`
  &.MuiPaper-root {
    min-width: 120px;
    min-height: 44px;
    padding: 0;
    border-radius: 5px;

    background: linear-gradient(to right, #505050, #2f2f2f);
    
    font-family: Helvetica, sans-serif;
    font-size: 13px;
    padding-bottom: 4px;
    cursor: default;

    .node-label {
      position: relative;

      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: space-between;
      
      height: 20px;
      padding: 2px 5px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 5px 5px 0 0;
      margin-bottom: 4px;

      background: linear-gradient(to right, #608ca1 5%, #464b4e);
      color: white;

      .label {
        justify-content: flex-start;
        padding-right: 20px;
        margin: 5px;
        font-weight: 700;

      }

      .close {
        color: #FFFFFF;
        
        :hover {
          color: #F4504D;
        }
      }
    }

    .node-command {
      display: flex;
      justify-content: center;

      padding: 4px 10px 4px;

      color: white;
      font-size: 0.9em;

      & .wrapper-badge {
        display: flex;

        align-items: center;
        justify-content: center;
        text-align: center;
        min-width: 20px;

        /* background-color: #0282FF; */
        color: #FFF;
        /* border-radius: 10px;
        padding: 1px 10px; */
      }
    }

    .node-socket {
      display: flex;
      flex-direction: row;
      position: relative;
      padding: 4px 0;
      color: #fff;

      &.socket-input {
        padding-left: 18px;
        padding-right: 6px;
        justify-content: flex-start;
      }

      &.socket-output {
        padding-right: 18px;
        padding-left: 6px;
        justify-content: flex-end;
      }
    }

    .socket-io {
      width: 10px;
      height: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.io-input {
        border: 2px solid #94e349;
        border-radius: 0 10px 10px 0;
        border-left: 0;
        left: 0px;
        background: transparent;
      }

      &.io-output {
        border: 2px solid #ff0072;
        border-radius: 10px 0 0 10px;
        border-right: 0;
        right: 0px;
        background: transparent;
      }
    }
    
  }
`

export const CardsContainer = styled.div`
  height: 100%;
  display:flex;
  margin-right: 5px;

  &.flex-overflow {
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    overflow: overlay;
  }

  &.flex-wrapped {
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  &::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }

  &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,.3);
      :hover {
        background-color: #41434DDD;
      }
    }
  
`

export const StyledCard = styled(StyledNode)`
  &.MuiPaper-root{
    min-width: 280px;
    max-width: 300px;
    min-height: 150px;
    margin: 5px 0 5px 5px;
    max-height: 400px;

    .node-label {
      justify-content: flex-start;
      
      .label {
        padding-right: 10px;
      }

      .wrapper-chip {
          display: flex;

          align-items: center;
          justify-content: center;
          text-align: center;
          min-width: 20px;

          background-color: #363636;
          color: #FFF;
          border-radius: 4px;
          padding: 1px 8px;
      }
    }
  }
`
export const SoftwareList: typeof List = styled(List).attrs({
  disablePadding: true
})`
  &.MuiList-root{
    font-family: Helvetica, sans-serif;
    padding: 0 5px;
    max-height: calc(100% - 28px); // 30px e do label do node
    overflow-x: hidden;
    overflow-y: auto;
    overflow: overlay;
  }

  &::-webkit-scrollbar {
      width: 6px;
    }

  &::-webkit-scrollbar-thumb {
      background-color: rgba(255,255,255,.3);
    }
`

export const SoftwareListItem: typeof ListItem = styled(ListItem).attrs({
  disableGutters: true
})`
  &.MuiListItem-root{
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 20px;
    max-height: 20px;
    margin-bottom: 5px;
    padding: 0 6px;

    color: #FFFFFF;

    .param-label {
      display: flex;
      align-items: center;
      column-gap: 2px;
    }

    .param-input {
      display: flex;
      align-items: center;
      right: 0;
    } 
  }
`
export const MiniButton = styled(Button).attrs(({ ...props }) => ({
  className: `nodrag ${props.className}`,
  disableRipple: true
}))`
  &.MuiButtonBase-root {
    min-height: 16px;
    min-width: 16px;
    max-height: 16px;
    max-width: 16px;
    padding: 2px;
    margin-right: 0px;
    
    border-radius: 3px;
    background-color: #4f7cff;
    color: #fff;

    :hover {
      background-color: #175dff;
    }

    &.card-button {
      min-height: 18px;
      min-width: 20px;
      max-height: 100%;
      max-width: 100%;
      border-radius: 0 5px 5px 0;

      &[disabled] {
        background-color: #b2b2b2;
        color: #555;
      }
    }

    & .rot-icon {
      transform: rotate(90deg);
    }
  }
`
export const MiniSwitch = styled(Switch)`
  &.MuiSwitch-root {
    width: 28px;
    height: 16px;   
    padding: 0px;
    display: flex;
    align-items: center;

  .MuiSwitch-switchBase {
    padding: 2px;
    color: grey;

    &.Mui-checked {
      transform: translateX(12px);
      color: white;

      & + .MuiSwitch-track {
        opacity: 1;
        background-color: #4f7cff;
        border-color: #4f7cff;
      }
    }
  }

  .MuiSwitch-thumb {
      width: 12px;
      height: 12px;
      box-shadow: none;
  }

    .MuiSwitch-track {
      border: 1px solid #9E9E9E;
      border-radius: 16px;
      opacity: 1;
      background-color: white;
    }
  }
    
`
export const StyledParamInput = styled.input.attrs(({ size }) => ({
  size: size || 10
}))`
  min-height: 18px;
  border: 0;
  border-radius: 5px;
  background-color: #DDD;
  padding: 0 5px;
  margin-left: 5px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &[type=text]  {
    border-radius: 5px 0 0 5px;
  }

  &[disabled] {
    background-color: grey;
    color: #DDD;
  }

  &[type=number] {
    max-width: 3ch;
  }
`
export const StyledParamSelect = styled.select`
    max-height: 18px;
    max-width: 85px;
    background-color: #DDD;
    border: 0;
    border-radius: 5px;

    margin-left: 5px;
`
