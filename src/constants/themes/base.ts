import { createMuiTheme } from '@material-ui/core/styles'

const BaseTheme = createMuiTheme({
  props: {
    MuiAppBar: {
      position: 'fixed',
      elevation: 1
    },
    MuiDrawer: {
      variant: 'permanent',
      elevation: 0
    }
  },
  zIndex: {
    appBar: 2,
    drawer: 0
  }
})

export { BaseTheme }
