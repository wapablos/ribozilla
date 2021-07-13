/* eslint-disable camelcase */
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

export interface IExtensionCache {
  name: string
  version: string
  sha: string
  download_url: string
  filename: string
}
export interface IExtensionList {
  installed: Partial<IExtensionCache>[]
  available: Partial<IExtensionCache>[]
}
