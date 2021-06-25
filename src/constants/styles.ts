import { createGlobalStyle } from 'styled-components'
import { isMac, isDevelopment } from './environment'

export const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      outline: 0;
    }
`

export const baseFeatures = {
  drawerWidth: 48,
  titlebarHeight: isMac && !isDevelopment ? 0 : 30,
  statusbarHeight: 22
}
