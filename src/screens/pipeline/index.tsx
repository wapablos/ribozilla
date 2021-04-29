import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '@store/.'
import { extensionsActions } from '@store/extensions'
import { RibozillaSchema, Categories } from '@ribozilla/extension-api'
import { Divider, Collapse } from '@material-ui/core'
import { VscChevronRight, VscChevronDown } from 'react-icons/vsc'
import { IconBaseProps } from 'react-icons/lib'
import { GiConsoleController } from 'react-icons/gi'
import { keys } from '@material-ui/core/styles/createBreakpoints'
import { PipelineScreen, StyledPanel, StyledList, StyledListItem, StyledListItemIcon } from './styles'
import { getSoftwareListByCategory, EnumCategories, KeyofCategories } from './internals'

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

function StyledChevron({ collapse = false }: { collapse?: boolean}) {
  const props: IconBaseProps = {
    color: 'white',
    size: '1.5em'
  }

  return (
    <StyledListItemIcon>
      {collapse
        ? <VscChevronDown {...props} />
        : <VscChevronRight {...props} />}
    </StyledListItemIcon>
  )
}

function SoftwareCategoryList(softwareList: EnumCategories, categoryKey: KeyofCategories) {
  return softwareList[categoryKey].map(({ command, software, version }) => (
    <StyledListItem>
      {software}
      (
      {command}
      )
    </StyledListItem>
  ))
}

function SoftwaresListContainer() {
  const dispatch = useDispatch()
  const [reload, setReload] = useState(true)
  const { extensions, loading, error } = useSelector<ApplicationState, ApplicationState['extensions']>((state) => state.extensions)

  useEffect(() => {
    dispatch(extensionsActions.loadRequest())
  }, [])

  const softwareList = getSoftwareListByCategory(extensions)

  return (
    <StyledList key="categ-list">
      {Object.keys(Categories).map((key, index) => {
        const [isOpen, setIsOpen] = useState(true)
        const k = key as KeyofCategories

        return (
          <div key={`categ-div-${index.toString()}`}>
            <Divider />
            <StyledListItem key={`categ-${index.toString()}`} onClick={() => setIsOpen(!isOpen)}>
              <StyledChevron collapse={isOpen} />
              {Categories[k].toUpperCase()}
            </StyledListItem>
            <Collapse in={isOpen} unmountOnExit>
              {SoftwareCategoryList(softwareList, k)}
            </Collapse>
          </div>
        )
      })}
    </StyledList>
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
