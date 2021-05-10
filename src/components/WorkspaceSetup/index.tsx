import React, { useEffect } from 'react'
import { FiSave, FiLock, FiPlay, FiTrash2, FiEdit3, FiFolderPlus, FiX, FiCopy, FiEye, FiKey, FiLoader, FiToggleLeft } from 'react-icons/fi'
import { ButtonBaseProps } from '@material-ui/core'
import { StyledCard, ActionButton } from './styles'
import { toggleProjectCard } from './internals'

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
  useEffect(() => {
    const projectTitle = document.getElementById('project-title') as HTMLElement
    projectTitle.focus()
  }, [])

  return (
    <StyledCard className="project edit-project">
      <div className="project-name" id="project-title" contentEditable> Project Name </div>
      <div className="card-item-input">
        Category
        <input type="text" placeholder="mRNA Alignment" />
      </div>

      <div className="card-item-input flex-column">
        Description
        <textarea placeholder="This project aims..." />
      </div>

      <div className="card-item-input">
        Project Path
        <div className="item-wrapper">
          <input type="text" placeholder="mRNA Alignment" className="side-button" />
          <ActionButton className="mini-button">
            <FiFolderPlus />
          </ActionButton>
        </div>
      </div>

      <div className="item-wrapper button-group">
        <ActionButton className="card-button misc">
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
      <div className="card-item-input">
        Category
        <input type="text" value="mRNA Alignment" disabled />
      </div>

      <div className="card-item-input flex-column">
        Description
        <textarea value="This project aims..." disabled />
      </div>

      <div className="card-item-input flex-column">
        Preview
        <div className="item-wrapper img-area">
          <img src="public/template-dna.jpg" alt="template" />
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
