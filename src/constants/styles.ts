import { createGlobalStyle } from 'styled-components'
import { isMac } from './environment'

export const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      outline: 0;
    }
`

export const baseFeatures = {
  drawerWidth: 48,
  titlebarHeight: !isMac ? 0 : 22,
  statusbarHeight: 22
}
