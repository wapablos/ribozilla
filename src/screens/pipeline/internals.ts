/* eslint-disable lines-between-class-members */
/* eslint-disable array-callback-return */
import { RibozillaSchema, Categories, CommandProps, IParameter } from '@ribozilla/extension-api'
import { Node } from 'react-flow-renderer'

export type KeyofCategories = keyof typeof Categories

export type CategoryList = {
  software?: string,
  version?: string,
  command?: string,
  params?: IParameter[]
}

export type EnumCategories = {
    [category in KeyofCategories]? : CategoryList[]
}

export class RibozillaNode implements Node {
  id: Node['id']
  type: Node['type']
  position: Node['position']
  data: CategoryList

  constructor({ ...props }: Partial<Node>) {
    this.id = props.id
    this.type = props.type
    this.position = props.position
    this.data = props.data
  }
}

export function generateId() {
  return 1
}

export function getSoftwareListByCategory(extensions:RibozillaSchema[]) {
  const softwareList: EnumCategories = Object.assign({}, ...Object.keys(Categories).map((key) => ({ [key]: [] })))

  extensions.map(({ commands, ...extension }, index) => {
    Object.keys(Categories).map((categoryKey) => {
      const key = categoryKey as KeyofCategories

      const list = commands.filter(({ category }) => category === Categories[key])
        .map(({ name, params }): CategoryList => ({
          software: extension.name,
          version: extension.version,
          command: name,
          params
        }))

      if (list.length !== 0) {
        softwareList[key] = [...softwareList[key], ...list]
      }
    })
  })

  return softwareList
}
