import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '@store/.'
import { extensionsActions } from '@store/extensions'
import { RibozillaSchema, Categories } from '@ribozilla/extension-api'
import { Divider, Collapse } from '@material-ui/core'
import { VscChevronRight, VscChevronDown } from 'react-icons/vsc'
import { BiLogInCircle } from 'react-icons/bi'
import { IconBaseProps } from 'react-icons/lib'
import ReactFlow, { Elements, Controls, Background, OnLoadParams } from 'react-flow-renderer'
import { MosaicBranch, MosaicWindow, Mosaic } from 'react-mosaic-component'
import { PipelineScreen, StyledPanel, StyledList, StyledListItem, StyledListItemIcon, SurfaceDiv, ListContainer, StyledMosaic } from './styles'
import { getSoftwareListByCategory, EnumCategories, KeyofCategories } from './internals'

function NodeSurface() {
  const [nodes, setNodes] = useState<Elements>([{
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 }
  }])

  return (
    <SurfaceDiv>
      <ReactFlow elements={nodes}>
        <Controls />
        <Background color="black" gap={16} />
      </ReactFlow>
    </SurfaceDiv>
  )
}

function CardsListContainer() {
  return (
    <>
      Cards
    </>
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
  return softwareList[categoryKey].map(({ command, software, version }, index) => (
    <StyledListItem key={`${command}-${index.toString()}`} className="software">
      {software}
      (
      {command}
      )
      <div className="mini-action">
        <BiLogInCircle size="1.6em" />
      </div>
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
    <ListContainer>
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
    </ListContainer>
  )
}

interface PanelAttrs {
  [key: string]: {
    title: string,
    component: JSX.Element
  }
}

const pipelineComponents: PanelAttrs = {
  softwares: {
    title: 'Software List',
    component: <SoftwaresListContainer />
  },
  workflow: {
    title: 'Workflow',
    component: <NodeSurface />
  },
  cards: {
    title: 'Setup',
    component: <CardsListContainer />
  }
}

function renderPanels(item: React.ReactText, path: MosaicBranch[]) {
  const { title, component } = pipelineComponents[item]
  return (
    <MosaicWindow toolbarControls={[]} path={path} title={title.toUpperCase()}>
      {component}
    </MosaicWindow>
  )
}

export default function Pipeline() {
  return (
    <PipelineScreen>
      <StyledMosaic
        renderTile={renderPanels}
      />
    </PipelineScreen>
  )
}
