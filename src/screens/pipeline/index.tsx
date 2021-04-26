import React from 'react'
import { RibozillaSchema } from '@ribozilla/extension-api'
import { PipelineScreen, StyledPanel } from './styles'

function NodeSurface() {
  return (
    <div>
      Node Map
    </div>
  )
}

function CardsListContainer() {
  return (
    <div>
      Cards
    </div>
  )
}

function SoftwaresListContainer() {
  return (
    <div>
      Softwares
    </div>
  )
}

export default function Pipeline() {
  window.electron.ipcRenderer.invoke('buu').then((res) => {
    console.log(res)
  })
  return (
    <PipelineScreen>
      <StyledPanel direction="row">
        <SoftwaresListContainer />
        <StyledPanel direction="column">
          <NodeSurface />
          <CardsListContainer />
        </StyledPanel>
      </StyledPanel>
    </PipelineScreen>
  )
}
