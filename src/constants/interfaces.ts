import { VariantType } from 'notistack'

export interface IProjectMeta {
  id: string
  name: string
  description?: string
  path: string
}

export interface IReadWrite {
  status: VariantType,
  message: string
}
