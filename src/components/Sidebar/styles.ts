import styled from 'styled-components'
import { Drawer, ListItem, Tooltip, withStyles } from '@material-ui/core'
import { baseFeatures } from '@constants/styles'

const baseColorPallete = {
  background: '#343746',
  icon: '#6272A4',
  workspace: '#989898',
  status: '#191A21',
  selected: '#F8F8F2'
}

export const RoutesScreen = styled.div`
  display: grid;
  box-sizing: border-box;
  background-color: #cccccc;
  width: 100%;
  max-height: calc(100% - ${baseFeatures.titlebarHeight + baseFeatures.statusbarHeight}px);
  margin-top: ${baseFeatures.titlebarHeight}px;
  margin-bottom: ${baseFeatures.statusbarHeight}px;
  padding: 0px;
`

export const StyledSidebar: typeof Drawer = styled(Drawer)`
  .MuiDrawer-root {
    flex-shrink: 0;
    width: ${baseFeatures.drawerWidth}px;
  }

  .MuiDrawer-paper {
    position: relative;
    top: ${baseFeatures.titlebarHeight}px;
    width: ${baseFeatures.drawerWidth}px;
    height: calc(100% - ${baseFeatures.titlebarHeight + baseFeatures.statusbarHeight}px);
    background-color: ${baseColorPallete.background};
    justify-content: space-between;
  }
`

export const StyledListItem: typeof ListItem = styled(ListItem).attrs({
  button: true,
  disableGutters: true
})`
  &.MuiListItem-root {
    max-width: 100%;
    height: ${baseFeatures.drawerWidth}px;
    margin-bottom: 4px;
    justify-content: center;
    margin-top: auto;
  }
  
  &.MuiListItem-button {
    color: ${baseColorPallete.icon};
    background-color: ${baseColorPallete.background};
 
    :hover {
      color: ${baseColorPallete.selected};
      background-color: ${baseColorPallete.background};
    }

    &.Mui-selected {
      &, :hover {
      color: ${baseColorPallete.selected};
      background-color: #F4F4F41A;
      border-left: 2px solid #FF79C680;
      }
    }
  }
`
export const StyledTooltip: typeof Tooltip = styled(withStyles({
  tooltip: {
    margin: 2
  }
})(Tooltip)).attrs({
  placement: 'right',
  enterDelay: 200
})``
