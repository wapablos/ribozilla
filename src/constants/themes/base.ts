/* eslint-disable import/prefer-default-export */
import { createMuiTheme } from '@material-ui/core'

/**
 * Global dimensions of theme compoenents
 */
export const drawerWidth = 140
export const menubarHeight = 10
export const statusbarHeight = 10
export const toolbarHeight = 27

export const BaseTheme = createMuiTheme({
  props: {
    MuiDrawer: {
      variant: 'permanent'
    },
    MuiAppBar: {
      elevation: 0
    }
  },
  mixins: {
    toolbar: {
      minHeight: toolbarHeight
    }
  }
})
