import React, { useEffect, useState } from 'react'
import { FiSave, FiPlay, FiTrash2, FiFolderPlus, FiX, FiCopy } from 'react-icons/fi'
import { ButtonBaseProps } from '@material-ui/core'
import { FileBrowserEvents, ReadWriteEvents, ProjectsEvents } from '@constants/events'
import { IProjectMeta, IReadWrite } from '@constants/interfaces'
import { useSnackbar } from 'notistack'
import * as path from 'path'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '@store/.'
import { systemActions } from '@store/system'
import { StyledCard, ActionButton } from './styles'
import { toggleProjectCard, handleState } from './internals'

interface IActionButton extends Partial<ButtonBaseProps> {
  label: string
  icon: React.ReactNode
}

export function WorkspaceButton({ label, icon, ...props }: IActionButton) {
  return (
    <ActionButton className="workspace-button" onClick={props.onClick}>
      {icon}
      <div className="button-label">{label}</div>
    </ActionButton>
  )
}

export function SetupProjectCard() {
  const [projectMeta, setProjectMeta] = useState<IProjectMeta>({ id: `${Math.random().toString(36).substr(2, 9)}`, name: '', description: '', path: '' })
  const { enqueueSnackbar } = useSnackbar()

  const handleProjectPath = async () => {
    const res = await window.electron.ipcRenderer.invoke(FileBrowserEvents.CHOOSE_DIR).then((res) => res)
    if (res !== undefined) setProjectMeta({ ...projectMeta, path: res })
  }

  const handleProjectMeta = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleState(e, projectMeta, setProjectMeta)
  }

  const saveProjectMeta = () => {
    window.electron.ipcRenderer.invoke(ReadWriteEvents.WRITE_FILE, projectMeta).then(({ status, message }: IReadWrite) => {
      enqueueSnackbar(message, { variant: status, style: { whiteSpace: 'pre-line' } })
      console.log(status)
    })
  }

  console.log(projectMeta)
  return (
    <StyledCard className="project edit-project">
      <div className="card-item-input">
        Name
        <input required id="name" type="text" placeholder="Cancer DE" value={projectMeta.name} onChange={handleProjectMeta} />
      </div>

      <div className="card-item-input flex-column">
        Description
        <textarea id="description" placeholder="This project aims..." value={projectMeta.description} onChange={handleProjectMeta} />
      </div>

      <div className="card-item-input">
        Project Path
        <div className="item-wrapper">
          <input id="path" type="text" placeholder="~/.ribozilla" className="side-button" value={projectMeta.path} onChange={handleProjectMeta} />
          <ActionButton className="mini-button" onClick={handleProjectPath}>
            <FiFolderPlus />
          </ActionButton>
        </div>
      </div>

      <div className="item-wrapper button-group">
        <ActionButton className="card-button misc" onClick={saveProjectMeta}>
          <FiSave size="1.3em" />
          <div className="side-label">Save</div>
        </ActionButton>

        <ActionButton className="card-button cancel" onClick={toggleProjectCard(false)}>
          <FiX size="1.3em" />
          <div className="side-label">Cancel</div>
        </ActionButton>
      </div>
    </StyledCard>
  )
}

export function ProjectCard({ id, name, description, path, file } : Partial<IProjectMeta>) {
  const args: IProjectMeta = { id, name, description, path, file }
  const dispatch = useDispatch()
  const deleteProjectMeta = () => {
    console.log(id)
    window.electron.ipcRenderer.invoke(ProjectsEvents.DELETE_RECENT, { id }).then((res) => {
      console.log('(Delete Project) ', res)
    })
  }

  const openProjectMeta = () => {
    dispatch(systemActions.openProjectPath(path, name))

    window.electron.ipcRenderer.invoke(ProjectsEvents.OPEN_PROJECT, args).then((res) => {
      console.log('(Open project) ', res)
    })
  }

  return (
    <StyledCard className="project">
      <div className="project-name">{name}</div>

      <div className="card-item-input flex-column">
        Description
        <textarea value={description} disabled />
      </div>

      <div className="card-item-input flex-column">
        Preview
        <div className="item-wrapper img-area">
          <img src="public/template-dna.png" alt="template" />
        </div>
      </div>

      <div className="item-wrapper button-group">
        <ActionButton className="card-button start" onClick={openProjectMeta}>
          <FiPlay size="1.3em" />
          <div className="side-label">Start</div>
        </ActionButton>

        {/* <ActionButton className="card-button misc">
          <FiCopy size="1.3em" />
          <div className="side-label">Copy</div>
        </ActionButton> */}

        <ActionButton className="card-button cancel" onClick={deleteProjectMeta}>
          <FiTrash2 size="1.3em" />
          <div className="side-label">Delete</div>
        </ActionButton>
      </div>
    </StyledCard>
  )
}
