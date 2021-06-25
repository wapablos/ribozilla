import styled from 'styled-components'
import { AppBar, Toolbar } from '@material-ui/core'
import { baseFeatures } from '@constants/styles'

export const StatusbarContainer = styled(AppBar)`
  &.MuiAppBar-root {
    background-color: rgba(33, 34, 44, 0.9); //#191A21;
    top: auto;
    bottom: 0;
    height: ${baseFeatures.statusbarHeight}px;
    padding: 0;
  }
`

export const StyledToolbar = styled(Toolbar)`
  &.MuiToolbar-root {
    background-color: aliceblue;
    min-height: ${baseFeatures.statusbarHeight}px;
    padding: 0;
    color: #FFF;
    background-color: transparent;
    font-family: Helvetica;
    font-size: 0.85em;

    .hostname-chip {
      display: flex;
      align-items: center;
      height: 100%;
      /* margin: 0 10px;*/
      padding: 0 8px;
      /*border-radius: 10px; */
    }
  }
`
