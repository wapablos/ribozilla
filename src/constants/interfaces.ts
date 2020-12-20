import { VariantType } from 'notistack'

export interface ISystemInfo {
  arch: string
  hostname: string
  platform: string
  release: string
}

export interface IReadWrite {
  status: VariantType,
  message: string
}
