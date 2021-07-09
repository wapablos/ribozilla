/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '@store/.'
import { extensionsActions } from '@store/extensions'
import { nodesActions } from '@store/nodes'
import { Categories, IParameter, RequiredTypes, InputTypes, InputProps } from '@ribozilla/clui-api'
import { Divider, Collapse } from '@material-ui/core'
import { VscChevronRight, VscChevronDown, VscChromeClose } from 'react-icons/vsc'
import { BiRightArrowCircle } from 'react-icons/bi'
import { IconBaseProps } from 'react-icons/lib'
import ReactFlow, { Controls, Background, NodeTypesType, OnLoadParams, Handle, Position, Edge, Connection, isNode, getBezierPath, EdgeProps, EdgeTypesType, getEdgeCenter, Node } from 'react-flow-renderer'
import { MosaicBranch, MosaicWindow, MosaicNode } from 'react-mosaic-component'
import * as lo from 'lodash'
import { FiLock, FiEdit3, FiFolderPlus, FiFilePlus } from 'react-icons/fi'
import { RiUser4Line, RiCheckboxBlankCircleLine, RiSubtractLine, RiCloseLine } from 'react-icons/ri'
import { MosaicParent } from 'react-mosaic-component/lib/types'
import { systemActions } from '@store/system'
import { useHotkeys } from 'react-hotkeys-hook'
import { ReadWriteEvents } from '@constants/events'
import { useSnackbar } from 'notistack'
import { PipelineScreen, StyledList, StyledListItem, StyledListItemIcon, SurfaceDiv, ListContainer, StyledMosaic, StyledNode, TheDivider, CardsContainer, StyledCard, SoftwareList, SoftwareListItem, MiniSwitch, MiniButton, StyledParamInput, StyledParamSelect, StyledSVG } from './styles'
import { getSoftwareListByCategory, EnumCategories, KeyofCategories, RibozillaNode } from './internals'

function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {} }: EdgeProps) {
  const dispatch = useDispatch()
  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })
  const [centerX, centerY] = getEdgeCenter({ sourceX, sourceY, targetX, targetY })

  const handleEdgeDelete = (id:string) => { dispatch(nodesActions.deleteNode(id)) }

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} />
      <StyledSVG x={centerX - 5} y={centerY - 5} width={10} height={10} viewBox="0 0 10 10">
        <circle cx="50%" cy="50%" r={4} onClick={() => handleEdgeDelete(id)} />
        <VscChromeClose x="18%" y="18%" className="icon" size="0.4em" />
      </StyledSVG>
    </>
  )
}

function SoftwareNode({ id, data } : RibozillaNode) {
  const dispatch = useDispatch()

  const handleNodeDelete = () => { dispatch(nodesActions.deleteNode(id)) }

  const Label = useMemo(() => (
    <div className="node-label">
      <div className="label">{id.toUpperCase()}</div>
      <MiniButton className="label-button close" onClick={handleNodeDelete}>
        <VscChromeClose size="1.1em" />
      </MiniButton>
    </div>
  ), [])

  const Command = useMemo(() => (
    <div className="node-command">
      <div className="wrapper-badge">{data.command}</div>
    </div>
  ), [])

  const Content = () => {
    const mainIn = data?.params.filter(({ isRequired }) => (isRequired === RequiredTypes.MAIN_IN))
    const mainOut = data?.params.filter(({ isRequired }) => (isRequired === RequiredTypes.MAIN_OUT))

    return (
      <>
        {mainIn?.map(({ label, signature }, index) => (
          <div className="node-socket socket-input" key={`main-in-${index}-${signature}`}>
            <Handle id={signature} className="socket-io io-input" type="target" position={Position.Left} />
            {label}
          </div>
        ))}
        { mainOut.length === 0 ? <></> : <TheDivider />}
        {mainOut?.map(({ label, signature }, index) => (
          <div className="node-socket socket-output" key={`main-out-${index}-${signature}`}>
            {label}
            <Handle id={signature} className="socket-io io-output" type="source" position={Position.Right} />
          </div>
        ))}
      </>
    )
  }

  return (
    <StyledNode>
      {Label}
      {Command}
      <Content />
    </StyledNode>
  )
}

const nodeTypes: NodeTypesType = {
  software: SoftwareNode
}

const edgeTypes: EdgeTypesType = {
  custom: CustomEdge
}

function NodeSurface() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { nodes, update } = useSelector<ApplicationState, ApplicationState['nodes']>((state) => state.nodes)
  const { currentProject, writeError } = useSelector<ApplicationState, ApplicationState['system']>((state) => state.system)

  const onLoad = (reactFlowInstance: OnLoadParams) => { reactFlowInstance.setTransform({ x: 0, y: 0, zoom: 0.9 }) }
  const onConnect = (connection: Edge | Connection) => { dispatch(nodesActions.linkNodes({ ...connection, type: 'custom' })) }
  const onNodeDragStop = (event: React.MouseEvent, node: Node) => { dispatch(nodesActions.updateFlow(node)) }

  const handleSave = useHotkeys('ctrl+s, command+s', () => {
    console.log('just once')
    dispatch(nodesActions.updateNodes)
    dispatch(systemActions.updateProjectFiles())
  }, {
    filter: () => update
  })

  if (writeError) {
    enqueueSnackbar('Check your read/write permissions', { variant: 'warning', style: { whiteSpace: 'pre-line' } })
    dispatch(systemActions.writeProjectSuccess())
  }

  useEffect(() => {
    console.log(nodes)
    console.log(update)
    handleSave
    window.electron.ipcRenderer.invoke(ReadWriteEvents.UPDATE_FILES, update ? `${currentProject.name} •` : currentProject.name)
  }, [nodes, update])

  return (
    <SurfaceDiv>
      <ReactFlow elements={nodes} nodeTypes={nodeTypes} edgeTypes={edgeTypes} onLoad={onLoad} onConnect={onConnect} onNodeDragStop={onNodeDragStop}>
        <Controls />
        <Background color="black" gap={16} />
      </ReactFlow>
    </SurfaceDiv>
  )
}

function SoftwareInputType({ type, values, node, inputIndex, placement } : Partial<InputProps> & { node: RibozillaNode, inputIndex?: number, placement?: number }) {
  const dispatch = useDispatch()
  const [lastValue, setLastValue] = useState<any>(null)

  const handleOnChange = (value: string | boolean | number) => {
    // eslint-disable-next-line no-param-reassign
    node.data.params[inputIndex].lastValues[placement] = value as string
    console.log(node.data.params[inputIndex])
    setLastValue(node.data.params[inputIndex].lastValues[placement])
    // dispatch(systemActions.updateProjectFiles())
  }

  useEffect(() => {
    setLastValue(node.data.params[inputIndex].lastValues[placement])
  }, [])

  switch (type) {
    case InputTypes.BOOLEAN:
      return <MiniSwitch onChange={(e, c) => handleOnChange(c)} checked={lastValue as boolean ?? false} />

    case InputTypes.FILE:
      return (
        <>
          <StyledParamInput type="text" placeholder="select files" />
          <MiniButton className="card-button">
            <FiFilePlus />
          </MiniButton>
        </>
      )

    case InputTypes.DIR:
      return (
        <>
          {/* <StyledParamInput type="text" placeholder="select folder" value={lastValue as string} /> */}
          <StyledParamInput type="text" placeholder="select folder" />
          <MiniButton className="card-button">
            <FiFolderPlus />
          </MiniButton>
        </>
      )

    case InputTypes.NUMBER:
      return <StyledParamInput type="number" size={2} placeholder="2" onChange={(e) => handleOnChange(e.target.value)} value={lastValue as number || ''} />
      // return <StyledParamInput type="number" size={2} placeholder="2" />

    case InputTypes.ENUM:
      if (values === undefined || values.length === 0) break

      return (
        <StyledParamSelect>
          {values.map((value, index) => (
            <option key={`value-${index}`}>{value.replace(/^[-]*/, '')}</option>
          ))}
        </StyledParamSelect>
      )

    case InputTypes.STRING:
      return <StyledParamInput type="text" />

    default:
      return <StyledParamInput size={5} disabled value={type} />
  }
}

function switchRoles() {
  const readWriteIcons = {
    lock: <FiLock />,
    edit: <FiEdit3 />
  }

  const socketsIcons = {
    input: <RiSubtractLine className="rot-icon" />,
    output: <RiCheckboxBlankCircleLine className="rot-icon" />,
    both: <RiUser4Line className="rot-icon" />,
    none: <RiCloseLine />
  }

  const [rwIcon, setRwIcon] = useState<keyof typeof readWriteIcons>('lock')
  const [socketIcon, setSocketIcon] = useState<keyof typeof socketsIcons>('input')
  const selectRwIcon = readWriteIcons[rwIcon]
  const selectSocketIcon = socketsIcons[socketIcon]

  type IconList = <T>(routinesIconList: T, routine: keyof T, setRoutine: React.Dispatch<React.SetStateAction<keyof T>>) => void

  const toggleRoutines: IconList = (iconList, routine, setRoutine) => {
    const keys = Object.keys(iconList)
    const index = keys.indexOf(routine as string)
    const next = keys[index + 1] || keys[0]
    setRoutine(next as typeof routine)
  }

  const toggleIconsRw = () => toggleRoutines(readWriteIcons, rwIcon, setRwIcon)
  const toggleIconsSocket = () => toggleRoutines(socketsIcons, socketIcon, setSocketIcon)

  return { selectRwIcon, toggleIconsRw, selectSocketIcon, toggleIconsSocket }
}

// function SoftwareCard({ id, data, nodeIndex } : Partial<RibozillaNode> & { nodeIndex?: number }) {
function SoftwareCard({ node }: {node: RibozillaNode}) {
  const { id, data } = node
  const checkIsRequired = (isRequired: RequiredTypes) => {
    const { selectRwIcon, toggleIconsRw } = switchRoles()

    if (isRequired === RequiredTypes.MAIN_IN || isRequired === RequiredTypes.MAIN_OUT) {
      return (
        <MiniButton onClick={toggleIconsRw}>
          {selectRwIcon}
        </MiniButton>
      )
    }
  }

  const Label = () => (
    <div className="node-label">
      <div className="label">
        {id?.toUpperCase()}
      </div>
      <div className="wrapper-chip">{data?.command}</div>
    </div>
  )

  const Content = () => (
    <SoftwareList>
      {data?.params.map(({ label, signature, inputs, isRequired }, dataIndex) => (
        <SoftwareListItem key={`sw-${dataIndex}-${signature}`}>
          <div className="param-label" key={`label-${dataIndex}-${signature}`}>
            {checkIsRequired(isRequired)}
            {label}
          </div>
          <div className="param-input" key={`input-${dataIndex}-${signature}`}>
            {inputs.map(({ type, values }, placeIndex) => (
              // <SoftwareInputType key={`input-${type}-${placeIndex}`} type={type} values={values} id={id} inputIndex={dataIndex} nodeIndex={nodeIndex} placement={placeIndex} />
              <SoftwareInputType key={`input-${type}-${placeIndex}`} type={type} values={values} node={node} inputIndex={dataIndex} placement={placeIndex} />
            ))}
          </div>
        </SoftwareListItem>
      ))}
    </SoftwareList>
  )
  return (
    <StyledCard>
      <Label />
      { data?.params && <Content /> }
    </StyledCard>
  )
}

// TODO: Add memo
function SoftwaresCardListContainer() {
  const containerRef = useRef<HTMLDivElement>()

  const { nodes } = useSelector<ApplicationState, ApplicationState['nodes']>((state) => state.nodes)
  // const nodesOnly = lo.filter(nodes, isNode) as Node<CategoryList>[]

  useEffect(() => {
    const { scrollWidth, scrollHeight } = containerRef.current
    containerRef.current.scrollTo({ top: scrollHeight, left: scrollWidth, behavior: 'smooth' })
  }, [nodes])

  return (
    <CardsContainer className="cards-container" ref={containerRef}>
      {nodes.map((node, index) => {
        // if (isNode(node)) { return <SoftwareCard id={node.id} data={node.data} key={`card-${index}-${node.id}`} nodeIndex={index} /> }
        if (isNode(node)) { return <SoftwareCard key={`card-${index}-${node.id}`} node={node as RibozillaNode} /> }
      })}
    </CardsContainer>
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
        id: `node-${Math.random().toString(36).substr(2, 9)}`,
        type: 'software',
        position: { x: lo.random(0, 250), y: lo.random(50, 100) },
        data: { software, command, params }
      })
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
          <StyledListItem key={`${command}-${index}`} className="software">
            {`${software} (${command})`}
            <div className="mini-action" onClick={() => addNode(software, command, params)}>
              <BiRightArrowCircle size="1.6em" />
            </div>
          </StyledListItem>
        ))}
      </Collapse>
    </div>
  )
}

function SoftwaresListContainer() {
  const dispatch = useDispatch()
  const { extensions, success, error } = useSelector<ApplicationState, ApplicationState['extensions']>((state) => state.extensions)

  useEffect(() => {
    if (!success || error) {
      console.log('(Software List) useEffect')
      dispatch(extensionsActions.loadRequest())
    }
  }, [success])

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
    component: <SoftwaresCardListContainer />
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
  const handleDivProportions = useCallback((node: MosaicNode<React.ReactText>) => {
    const { direction, second } = (node as MosaicParent<React.ReactText>) || { direction: '' }

    const { clientWidth, clientHeight, classList } = document
      .getElementsByClassName('cards-container')
      .item(0) as HTMLElement

    const sum = clientWidth - clientHeight
    const checkProportion = sum > 1

    const updateElement = (classname: string, toggle: boolean) => {
      classList.toggle(classname, toggle)
    }

    if (node === null) {
      updateElement('flex-overflow', checkProportion)
      updateElement('flex-wrapped', !checkProportion)
    }

    if (node !== null) {
      const checkRow = direction === 'row'
      const checkCol = direction === 'column'
      const secDirect = (second as any).direction

      if (checkRow && secDirect === 'column') {
        updateElement('flex-overflow', true)
        updateElement('flex-wrapped', false)
      }

      if (checkRow && secDirect === undefined) {
        updateElement('flex-overflow', false)
        updateElement('flex-wrapped', true)
      }

      if (checkRow && secDirect === 'row') {
        updateElement('flex-overflow', false)
        updateElement('flex-wrapped', true)
      }

      if (checkCol) {
        updateElement('flex-overflow', true)
        updateElement('flex-wrapped', false)
      }
    }
  }, [])

  useEffect(() => {
    handleDivProportions(null)
  }, [])

  return (
    <PipelineScreen>
      <StyledMosaic
        renderTile={renderPanels}
        onRelease={handleDivProportions}
      />
    </PipelineScreen>
  )
}
