import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '@store/.'
import { isNode } from 'react-flow-renderer'
import { RibozillaNode } from '@screens/pipeline/internals'
import { FiSave, FiEdit } from 'react-icons/fi'
import { ReadWriteEvents } from '@constants/events'
import { ToolboxWrapper, StyledCard } from './styles'
import { buildCommandLine } from './internals'

function ScriptCard({ id, script }: Partial<RibozillaNode> & { script: string }) {
  const [edit, setEdit] = useState(true)
  const [currentScript, setCurrentScript] = useState(script)

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleSave = (script: string) => {
    window.electron.ipcRenderer.invoke(ReadWriteEvents.SAVE_FILE, script).then((res) => {
      console.log(res)
    })
  }

  return (
    <StyledCard>
      <div className="node-label">
        <div className="label">{id}</div>
        <div className="button-group">
          <FiSave className="card-button save" size="1.1em" onClick={() => handleSave(currentScript)} />
          {/* <FiCopy className="card-button copy" size="1.1em" /> */}
          <FiEdit className="card-button edit" size="1.1em" onClick={handleEdit} />
        </div>
      </div>
      <textarea value={currentScript} disabled={edit} onChange={(e) => setCurrentScript(e.target.value)} />
    </StyledCard>
  )
}

export default function Toolbox() {
  const { nodes } = useSelector<ApplicationState, ApplicationState['nodes']>((state) => state.nodes)

  return (
    <ToolboxWrapper>
      {nodes.map((node) => {
        if (isNode(node)) {
          return <ScriptCard key={`script-${node.id}`} id={node.id} script={buildCommandLine(node as RibozillaNode)} />
        }
        return null
      })}
    </ToolboxWrapper>
  )
}
