/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
import React from 'react'
import * as star from '@extensions/star/star.json'
import * as trimmomatic from '@extensions/trimmomatic/trimmomatic.json'
import { RibozillaSchema, IRibozillaSchema } from '@extensions/api/types'
import { Elements, FlowElement, OnLoadParams } from 'react-flow-renderer'
import { pipelineActions, PipelineActionTypes } from '@store/pipeline'

export const cmdType = 'application/cmd'
export const cmdIdType = 'application/cmdId'

export function getExtensions() {
  const extensions = { star, trimmomatic } as IRibozillaSchema
  return extensions
}

export function setCommandNode(event: React.DragEvent<HTMLDivElement>, cmd: string, cmdId: string) {
  event.dataTransfer.setData(cmdType, cmd)
  event.dataTransfer.setData(cmdIdType, cmdId)
  event.dataTransfer.effectAllowed = 'move'
}

/*
TODO: Recuperar o modelo ao carregar o projeto
TODO: Cada nó deve ter um id, mesmo que seja o mesmo software
REVIEW: Posição do nó
*/
export function getCommandNode(
  event: React.DragEvent<HTMLDivElement>,
  nodeId: number,
  reactFlowWrapper: React.MutableRefObject<HTMLDivElement>,
  reactFlowInstance: OnLoadParams
) {
  event.preventDefault()

  const cmd = event.dataTransfer.getData(cmdType)
  const cmdId = event.dataTransfer.getData(cmdIdType)
  const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()

  const getId = () => `sw-node-${nodeId}`

  const position = reactFlowInstance.project({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top
  })

  const newNode: FlowElement = {
    id: getId(),
    position,
    data: { label: cmd }
  }

  event.dataTransfer.clearData()

  return { newNode, cmd, cmdId }
}

export function handleOnDragOver(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}
