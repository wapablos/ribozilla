/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '@store/.'
import { extensionsActions } from '@store/extensions'
import { nodesActions } from '@store/nodes'
import { Categories, IParameter, RequiredTypes } from '@ribozilla/extension-api'
import { Divider, Collapse } from '@material-ui/core'
import { VscChevronRight, VscChevronDown, VscChromeClose } from 'react-icons/vsc'
import { BiLogInCircle } from 'react-icons/bi'
import { FiLock } from 'react-icons/fi'
import { IconBaseProps } from 'react-icons/lib'
import ReactFlow, { Controls, Background, NodeTypesType, OnLoadParams, Handle, Position } from 'react-flow-renderer'
import { MosaicBranch, MosaicWindow } from 'react-mosaic-component'
import { uniqueId, random } from 'lodash'
import { PipelineScreen, StyledList, StyledListItem, StyledListItemIcon, SurfaceDiv, ListContainer, StyledMosaic, StyledNode, MiniButton } from './styles'
import { getSoftwareListByCategory, EnumCategories, KeyofCategories, RibozillaNode } from './internals'

function SoftwareNode({ data } : RibozillaNode) {
  const Label = () => (
    <div className="node-label">
      <div className="label">{data.software}</div>
      <VscChromeClose className="icon close" size="1.1em" />
    </div>
  )

  const Command = () => (
    <div className="node-command">
      <div className="wrapper-badge">{data.command}</div>
    </div>
  )

  const Content = () => {
    if (data.params === undefined) return (<></>)
    const mainIn = data.params.filter(({ isRequired }) => (isRequired === RequiredTypes.MAIN_IN))
    console.log(mainIn)

    return (
      <>
        {mainIn.map(({ label, signature }) => (
          <div className="node-socket socket-input">
            <Handle id={signature} className="socket-io io-input" type="target" position={Position.Left} />
            {label}
            <MiniButton>
              <FiLock />
            </MiniButton>
          </div>
        ))}
      </>
    )
  }

  return (
    <StyledNode>
      <Label />
      <Command />
      <Content />
    </StyledNode>
  )
}

const nodeTypes: NodeTypesType = {
  software: SoftwareNode
}

function NodeSurface() {
  const { nodes } = useSelector<ApplicationState, ApplicationState['nodes']>((state) => state.nodes)

  const handleOnLoad = (reactFlowInstance: OnLoadParams) => {
    reactFlowInstance.setTransform({ x: 0, y: 0, zoom: 0.9 })
  }

  return (
    <SurfaceDiv>
      <ReactFlow elements={nodes} onLoad={handleOnLoad} nodeTypes={nodeTypes}>
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

function SoftwareCategoryList(categKey: KeyofCategories, softwareList: EnumCategories, categIndex: number) {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const open = softwareList[categKey].length === 0
    setIsOpen(!open)
  }, [softwareList[categKey].length])

  const addNode = useCallback(
    (software: string, command: string, params: IParameter[]) => {
      const node = new RibozillaNode({
        id: uniqueId('node-'),
        type: 'software',
        position: { x: random(0, 250), y: random(50, 100) },
        data: {
          software, command, params
        }
      })
      console.log(node)
      dispatch(nodesActions.addNode(node))
    }, []
  )
  return (
    <div key={`categ-div-${categIndex}`}>
      <Divider />
      <StyledListItem key={`categ-${categIndex}`} onClick={() => setIsOpen(!isOpen)}>
        <StyledChevron collapse={isOpen} />
        {Categories[categKey].toUpperCase()}
      </StyledListItem>
      <Collapse in={isOpen} unmountOnExit>
        {softwareList[categKey].map(({ command, software, params }, index) => (
          <StyledListItem key={`${command}-${index.toString()}`} className="software">

            {`${software} (${command})`}

            <div className="mini-action" onClick={() => addNode(software, command, params)}>
              <BiLogInCircle size="1.6em" />
            </div>
          </StyledListItem>
        ))}
      </Collapse>
    </div>
  )
}

function SoftwaresListContainer() {
  const dispatch = useDispatch()
  const { extensions } = useSelector<ApplicationState, ApplicationState['extensions']>((state) => state.extensions)

  useEffect(() => {
    dispatch(extensionsActions.loadRequest())
  }, [])

  const softwareList = getSoftwareListByCategory(extensions)

  return (
    <ListContainer>
      <StyledList key="categ-list">
        {Object.keys(Categories).map((key, index) => SoftwareCategoryList(key as KeyofCategories, softwareList, index))}
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
