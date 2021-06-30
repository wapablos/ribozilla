import React from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '@store/.'
import { isNode } from 'react-flow-renderer'
import { RibozillaNode } from '@screens/pipeline/internals'
import { ToolboxWrapper } from './styles'
import { buildCommandLine } from './internals'

export default function Toolbox() {
  const { nodes, update } = useSelector<ApplicationState, ApplicationState['nodes']>((state) => state.nodes)

  return (
    <ToolboxWrapper>
      {nodes.map((node, index) => {
        if (isNode(node)) {
          return (
            <div key={`script-${node.id}`}>
              {buildCommandLine(node as RibozillaNode)}
              <hr />
            </div>
          )
        }
        return null
      })}
    </ToolboxWrapper>
  )
}
