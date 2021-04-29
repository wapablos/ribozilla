/* eslint-disable array-callback-return */
import { RibozillaSchema, Categories } from '@ribozilla/extension-api'

export type KeyofCategories = keyof typeof Categories

export type CategoryList = {
  software?: string,
  version?: string,
  command?: string
}

export type EnumCategories = {
    [category in KeyofCategories]? : CategoryList[]
}

export function getSoftwareListByCategory(extensions:RibozillaSchema[]) {
  const softwareList: EnumCategories = Object.assign({}, ...Object.keys(Categories).map((key) => ({ [key]: [] })))

  extensions.map(({ commands, ...extension }, index) => {
    Object.keys(Categories).map((categoryKey) => {
      const key = categoryKey as KeyofCategories

      const list = commands.filter(({ category }) => category === Categories[key]).map(({ name }): CategoryList => ({
        software: extension.name,
        version: extension.version,
        command: name
      }))

      if (list.length !== 0) {
        softwareList[key] = [...softwareList[key], ...list]
      }
    })
  })

  return softwareList
}
