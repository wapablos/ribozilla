/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import {
  Grid, List, MuiThemeProvider, ListItem, MenuItem, Button, Switch,
  ListItemText, Divider, Select, Collapse, IconButton
} from '@material-ui/core'
import {
  MdExpandLess, MdExpandMore, MdAdd, MdRemove
} from 'react-icons/md'

import { FileBrowserEvents } from '@constants/events'
import {
  theme, StyledGrid, StyledPaper, StyledInput
} from './styles'

import { getExtensions } from './internals'

interface ISoftwareInput {
  type: string,
  values?:string[]
}

function SoftwareList() {
  const extensions = getExtensions()

  const names = extensions.map((value, index) => value.name)
  const versions = extensions.map((value, index) => value.version)
  const commands = extensions.map((value, index) => value.commands)

  return (
    <List>
      {names.map((value, index) => {
        const [collapse, setCollapse] = useState(false)
        const handleCollapse = () => setCollapse(!collapse)
        return (
          <>
            <ListItem button onClick={handleCollapse}>
              <ListItemText id={`sw-${index}`} primary={value} />
              {versions[index]}
              {collapse ? <MdExpandLess /> : <MdExpandMore />}
            </ListItem>
            <Collapse in={collapse} unmountOnExit>
              <List>
                {commands[index].map(({ name, category }) => (
                  <ListItem button>
                    {name}
                    (
                    {category}
                    )
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        )
      })}
    </List>
  )
}

function SoftwareInput(input: ISoftwareInput[], places: number) {
  const isMulti = places === -1

  const [select, setSelect] = useState('')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelect(event.target.value as string)
  }

  const handleFiles = () => window.electron.send(FileBrowserEvents.CHOOSE_FILE)
  const handleFolders = () => window.electron.send(FileBrowserEvents.CHOOSE_DIR)

  return input.map(
    ({ type, values }, index) => {
      switch (type) {
        case 'enum': {
          if (values === undefined || values.length === 0) break

          const modValues = values.map((value) => value.replace(/^[-]*/, ''))

          return (
            <Select defaultValue={modValues[0]} onChange={handleChange}>
              { modValues.map((value) => (<MenuItem value={value}>{value}</MenuItem>)) }
            </Select>
          )
        }

        case 'number': {
          return <StyledInput id={`input-${index}`} type="number" />
        }

        case 'dir': {
          const [foldersInput, setfoldersInput] = useState([''])

          const addfolderInput = () => setfoldersInput(['', ...foldersInput])

          const removefolderInput = (index: number) => {
            foldersInput.splice(index, 1)
            setfoldersInput([...foldersInput])
          }

          const folders = foldersInput.map((value, index) => (
            <div>
              <StyledInput id={`folder-${index}`} placeholder={index.toString()} value={value} />
              <Button onClick={handleFolders}>Browser</Button>
              {
                (() => {
                  if (isMulti) {
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

        case 'file': {
          const [filesInput, setFilesInput] = useState([''])

          const addFileInput = () => setFilesInput(['', ...filesInput])

          const removeFileInput = (index: number) => {
            filesInput.splice(index, 1)
            setFilesInput([...filesInput])
          }

          const files = filesInput.map((value, index) => (
            <div>
              <StyledInput id={`file-${index}`} placeholder={index.toString()} value={value} />
              <Button onClick={handleFiles}>Browser</Button>
              {
                (() => {
                  if (isMulti) {
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

        case 'boolean':
          return <Switch />

        default: {
          return <StyledInput id={`input-${index}`} placeholder="unknown" />
        }
      }
    }
  )
}

function SoftwareCard() {
  const extensions = getExtensions()
  const { name, commands, version } = extensions[0]
  const { flags, args } = commands[0]

  return (
    <StyledPaper>
      {name}
      <Divider />
      <List>
        {args.map(({
          label, input, places
        }, index) => (
          <ListItem>
            <ListItemText id={`arg-${index}`} primary={label} />
            {SoftwareInput(input, places)}
          </ListItem>
        ))}
        {flags.map(({
          label, input, places
        }, index) => (
          <ListItem>
            <ListItemText id={`flag-${index}`} primary={label} />
            {SoftwareInput(input, places)}
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  )
}

export default function Pipeline() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledGrid container>
        <Grid item>
          <StyledPaper>
            <SoftwareList />
          </StyledPaper>
        </Grid>

        <Grid item>
          <StyledPaper>xs</StyledPaper>
        </Grid>
      </StyledGrid>

      <StyledGrid container>
        <Grid item>
          <SoftwareCard />
        </Grid>
      </StyledGrid>

    </MuiThemeProvider>
  )
}
