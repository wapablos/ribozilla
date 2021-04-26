import styled from 'styled-components'
import PanelGroup from 'react-panelgroup'

export const StyledPanel = styled(PanelGroup).attrs({
  borderColor: '#DDDDDD',
  panelColor: '#4169E1',
  spacing: 2
})`
  width: 100%;
`

export const PipelineScreen = styled.div`
  max-height: 100%;
  width: 100%;
  min-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`
