import React, { useState, useEffect } from 'react'
import { RibozillaSchema } from 'packages/ribozilla-extension-api/lib'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '@store/.'
import { extensionsActions } from '@store/xtensions'
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
  const dispatch = useDispatch()
  const { extensions, loading, error } = useSelector<ApplicationState, ApplicationState['extensions']>((state) => state.extensions)
  const [reload, setReload] = useState<boolean>(false)

  useEffect(() => {
    dispatch(extensionsActions.loadRequest())
  }, [reload])

  console.log(extensions)

  return (
    <div>
      {extensions.map(({ name }) => (
        <li>{name}</li>
      ))}
    </div>
  )
}

export default function Pipeline() {
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
