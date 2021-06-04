import React, { useEffect, useState } from 'react'
import { FiSave, FiPlay, FiTrash2, FiFolderPlus, FiX, FiCopy } from 'react-icons/fi'
import { ButtonBaseProps } from '@material-ui/core'
import { FileBrowserEvents, ReadWriteEvents } from '@constants/events'
import { IProjectMeta, IReadWrite } from '@constants/interfaces'
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
  const [projectMeta, setProjectMeta] = useState<IProjectMeta>({ id: '', name: '', description: '', path: '' })

  const handleProjectPath = async () => {
    const res = await window.electron.ipcRenderer.invoke(FileBrowserEvents.CHOOSE_DIR).then((res) => res)
    if (res !== undefined) setProjectMeta({ ...projectMeta, path: res })
  }

  const handleProjectMeta = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleState(e, projectMeta, setProjectMeta)
  }

  const saveProjectMeta = () => {
    window.electron.ipcRenderer.invoke(ReadWriteEvents.WRITE_FILE, projectMeta).then(({ status, message }: IReadWrite) => {
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

export function ProjectCard() {
  return (
    <StyledCard className="project">
      <div className="project-name"> Project Name </div>

      <div className="card-item-input flex-column">
        Description
        <textarea value="This project aims..." disabled />
      </div>

      <div className="card-item-input flex-column">
        Preview
        <div className="item-wrapper img-area">
          <img src="public/template-dna.png" alt="template" />
        </div>
      </div>

      <div className="item-wrapper button-group">
        <ActionButton className="card-button start">
          <FiPlay size="1.3em" />
          <div className="side-label">Start</div>
        </ActionButton>

        <ActionButton className="card-button misc">
          <FiCopy size="1.3em" />
          <div className="side-label">Copy</div>
        </ActionButton>

        <ActionButton className="card-button cancel">
          <FiTrash2 size="1.3em" />
          <div className="side-label">Delete</div>
        </ActionButton>
      </div>
    </StyledCard>
  )
}
