/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useRef } from 'react'
import ReactFlow, {
  Elements, Controls, Background, OnLoadParams
} from 'react-flow-renderer'
import {
  List, MuiThemeProvider, ListItem, MenuItem, Button, Switch,
  ListItemText, Divider, Select, Collapse, IconButton, Input, Paper
} from '@material-ui/core'
import {
  MdExpandLess, MdExpandMore, MdAdd, MdRemove
} from 'react-icons/md'

import {
  IInputProps, InputTypes, RibozillaSchema
} from '@extensions/api/types'
import { FileBrowserEvents } from '@constants/events'
import { useSelector, useDispatch } from 'react-redux'
import { pipelineActions, PipelineActionTypes } from '@store/pipeline'
import { ApplicationState } from '@store'

import {
  PipelineMuiTheme, PipelineScreen, StyledCardList, SoftwareList,
  CommandList, StyledContainer, StyledPaper, NodeSurface
} from './styles'

import {
  getExtensions, setCommandNode, getCommandNode, handleOnDragOver
} from './internals'

function PipelineNodeSurface() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>(null)
  const [nodes, setNodes] = useState<Elements>([])

  const { nodeId, data } = useSelector<ApplicationState, ApplicationState['pipeline']>((state) => state.pipeline)
  const dispatch = useDispatch()

  const handleOnLoad = (reactFlowInstance: OnLoadParams) => {
    setReactFlowInstance(reactFlowInstance)
  }

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const { newNode, cmd, cmdId } = getCommandNode(event, nodeId, reactFlowWrapper, reactFlowInstance)
    setNodes([...nodes, newNode])
    console.log('Id: ', nodeId)
    dispatch(pipelineActions.addPipelineSoftware([{ id: newNode.id, cmdId, softwareName: cmd }]))
    console.log('Data: ', data)
  }

  return (
    <NodeSurface ref={reactFlowWrapper}>
      <ReactFlow
        elements={nodes}
        onDragOver={handleOnDragOver}
        onDrop={handleOnDrop}
        onLoad={handleOnLoad}
      >
        <Controls />
        <Background color="#5b5b5b" gap={16} />
      </ReactFlow>
    </NodeSurface>
  )
}

function SoftwareInput(input: IInputProps[], places: number) {
  const variableInput = places === -1

  const [select, setSelect] = useState('')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelect(event.target.value as string)
  }

  const handleFiles = () => window.electron.send(FileBrowserEvents.CHOOSE_FILE)
  const handleFolders = () => window.electron.send(FileBrowserEvents.CHOOSE_DIR)

  return input.map(
    ({ type, values }, index) => {
      switch (type) {
        case InputTypes.ENUM: {
          if (values === undefined || values.length === 0) break

          const modValues = values.map((value) => value.replace(/^[-]*/, ''))

          return (
            <Select defaultValue={modValues[0]} onChange={handleChange}>
              { modValues.map((value) => (<MenuItem value={value}>{value}</MenuItem>)) }
            </Select>
          )
        }

        case InputTypes.NUMBER: {
          return <Input id={`input-${index}`} type="number" />
        }

        case InputTypes.DIR: {
          const [foldersInput, setfoldersInput] = useState([''])

          const addfolderInput = () => setfoldersInput(['', ...foldersInput])

          const removefolderInput = (index: number) => {
            foldersInput.splice(index, 1)
            setfoldersInput([...foldersInput])
          }

          const folders = foldersInput.map((value, index) => (
            <div>
              <Input id={`folder-${index}`} placeholder={index.toString()} value={value} />
              <Button onClick={handleFolders}>Browser</Button>
              {
                (() => {
                  if (variableInput) {
                    switch (index) {
                      case 0:
                        return <IconButton onClick={addfolderInput}><MdAdd /></IconButton>
                      default:
                        return <IconButton onClick={() => removefolderInput(index)}><MdRemove /></IconButton>
                    }
                  }
                })()
              }
            </div>
          ))

          return folders
        }

        case InputTypes.FILE: {
          const [filesInput, setFilesInput] = useState([''])

          const addFileInput = () => setFilesInput(['', ...filesInput])

          const removeFileInput = (index: number) => {
            filesInput.splice(index, 1)
            setFilesInput([...filesInput])
          }

          const files = filesInput.map((value, index) => (
            <div>
              <Input id={`file-${index}`} placeholder={index.toString()} value={value} />
              <Button onClick={handleFiles}>Browser</Button>
              {
                (() => {
                  if (variableInput) {
                    switch (index) {
                      case 0:
                        return <IconButton onClick={addFileInput}><MdAdd /></IconButton>
                      default:
                        return <IconButton onClick={() => removeFileInput(index)}><MdRemove /></IconButton>
                    }
                  }
                })()
              }
            </div>
          ))

          return files
        }

        case InputTypes.BOOLEAN:
          return <Switch />

        default: {
          return <Input id={`input-${index}`} placeholder="unknown" />
        }
      }
    }
  )
}

function AvaliableSoftwares() {
  const extensions = getExtensions()
  const softwares = Object.values(extensions)

  return (
    <StyledPaper>
      <List>
        {softwares.map(({ name, commands, version }, index) => {
          const [collapse, setCollapse] = useState(false)

          const handleCollapse = () => setCollapse(!collapse)

          return (
            <>
              <SoftwareList key={`sw-${index.toString()}`} button onClick={handleCollapse}>
                <ListItemText primary={name} />
                {version}
                {collapse ? <MdExpandLess /> : <MdExpandMore />}
              </SoftwareList>
              <Collapse in={collapse} unmountOnExit>
                <List>
                  {commands.map(({ name, category, cmdId }) => (
                    <CommandList
                      onDragStart={(e) => setCommandNode(e, name, cmdId)}
                      button
                      disableRipple
                      draggable
                    >
                      {name}
                      (
                      {category}
                      )
                    </CommandList>
                  ))}
                </List>
              </Collapse>
            </>
          )
        })}
      </List>
    </StyledPaper>
  )
}

function SoftwareCard() {
  const extensions = getExtensions()

  const { name, params } = extensions.star.commands[0]

  return (
    <StyledPaper>
      {name}
      <Divider />
      <List>
        {params.map(({ label, input, places }, index) => (
          <ListItem>
            <ListItemText id={`arg-${index}`} primary={label} />
            {SoftwareInput(input, places)}
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  )
}

export default function Pipeline() {
  const [nodeCard, setNodeCard] = useState<JSX.Element[]>([])
  const { data } = useSelector<ApplicationState, ApplicationState['pipeline']>((state) => state.pipeline)

  return (
    <MuiThemeProvider theme={PipelineMuiTheme}>
      <PipelineScreen>
        <StyledContainer>
          <AvaliableSoftwares />

          <Paper>
            <PipelineNodeSurface />
          </Paper>
        </StyledContainer>
        <StyledCardList>
          { data.length === 0
            ? <></>
            : data.map(() => (<SoftwareCard />))}
        </StyledCardList>
      </PipelineScreen>
    </MuiThemeProvider>
  )
}
