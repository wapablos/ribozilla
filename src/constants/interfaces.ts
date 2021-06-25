import { VariantType } from 'notistack'
import { Elements } from 'react-flow-renderer'

export interface IProjectMeta {
  id: string
  name: string
  description?: string
  path: string
  file?: string
}

export interface IReadWrite {
  status: VariantType,
  message: string
}

export interface IProjectData {
  path: string
  nodes: Elements
  tmpNodes?: Elements[]
}
