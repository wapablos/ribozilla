import styled from 'styled-components'
import { titlebarHeight } from '@components/Titlebar/styles'
import { statusBarHeight } from '@components/Statusbar/styles'

export const RoutesScreen = styled.div`
  display: grid;
  box-sizing: border-box;
  background-color: #989898;
  width: 100%;
  max-height: calc(100% - ${titlebarHeight + statusBarHeight}px);
  margin-top: ${titlebarHeight}px;
  margin-bottom: ${statusBarHeight}px;
  padding: 10px;
`

export const WorkspaceLayout = styled.div`
  display: flex;
  flex-shrink: 1;
  height: 100vh;
`
