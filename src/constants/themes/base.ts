import { createMuiTheme } from '@material-ui/core/styles'

export const BaseTheme = createMuiTheme({
  props: {
    MuiAppBar: {
      position: 'fixed',
      elevation: 0
    },
    MuiDrawer: {
      variant: 'permanent',
      elevation: 0
    },
    MuiButtonBase: {
      disableRipple: true
    }
  },
  zIndex: {
    appBar: 2,
    drawer: 0
  }
})
