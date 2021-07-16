/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import { ipcMain } from 'electron'
import { homedir } from 'os'
import { resolve, basename, join } from 'path'
import * as jetpack from 'fs-jetpack'
import { RibozillaExtensionValidator } from '@ribozilla/clui-api'
import { PipelineEvents } from '@constants/events'
import Store from 'electron-store'
import { IProjectMeta, IExtensionList } from '@constants/interfaces'
import { keyBy } from 'lodash'
import { exists, write } from 'fs-jetpack'
import axios from 'axios'
import { fetchExtensions } from './extensionsFromGithub'

export interface RecentsSchema {
  recents: IProjectMeta[]
}

export const homePath = homedir()
export const appPath = resolve(homePath, '.ribozilla')
export const extensionsPath = resolve(appPath, 'ribozilla-extensions')
export const extensionsPathProd = resolve(appPath, 'extensions')
export const recentsBasename = 'recents'
export const recentProjects = resolve(appPath, `${recentsBasename}.json`)
export const appConfig = resolve(appPath, 'config.json')
export const toolboxPath = (path: string, file?: string) => join(path, '.toolbox', file)
export const extensionCache = resolve(appPath, 'extensions.cache.json')
export const installedExtensions = resolve(appPath, 'extensions.list.json')

export async function checkAppConfigFiles() {
  if (!jetpack.exists(appPath) && !jetpack.exists(extensionsPath)) {
    jetpack.cwd(homePath).dir(appPath).dir(extensionsPath)
  }

  if (!jetpack.exists(recentProjects)) {
    const recents = new Store<RecentsSchema>({
      cwd: appPath,
      name: recentsBasename,
      fileExtension: 'json',
      defaults: { recents: [] }
    })
  }

  if (!jetpack.exists(extensionCache)) {
    fetchExtensions().then((res) => {
      jetpack.cwd(homePath).file(extensionCache, { content: res })
    }).catch((error) => {
      console.log(error)
    })
  }
}

export async function loadExtensions() {
  const extensionsPath = jetpack.find('ribozilla-extensions/cli', { matching: ['*manifest.json', '!node_modules/**/*'], directories: false })
  const extensionValidator = new RibozillaExtensionValidator()

  const extensions = await Promise.all(extensionsPath.map(async (extensionsPath) => jetpack
    .readAsync(extensionsPath, 'json')
    .then((extension) => {
      if (extensionValidator.validate(extension)) return extension
    })
    .catch((errno) => { console.log('File error: ', basename(extensionsPath)) })))
    .then((extensionArray) => extensionArray.filter((extension) => typeof extension !== 'undefined'))

  // console.log(extensions)
  // ipcMain.handle(PipelineEvents.GET_EXTENSIONS, async () => extensions)
}

export async function showInstalledExtensions() {
  const fetchFiles = await jetpack.find(extensionsPathProd, { matching: ['*.manifest.json', '!node_modules/**/*'], directories: false })
  const extensionValidator = new RibozillaExtensionValidator()

  const installedBasename = fetchFiles.map((v) => basename(v))

  const installed = await Promise.all(fetchFiles.map(async (path) => jetpack
    .readAsync(path, 'json')
    .then((extension) => {
      if (extensionValidator.validate(extension)) return extension
    })
    .catch((errno) => { console.log('File error: ', basename(path)) })))
    .then((extensionArray) => extensionArray.filter((extension) => typeof extension !== 'undefined'))

  console.log(fetchFiles)
  const mapAllExtensions: IExtensionList = {
    available: [],
    installed: []
  }

  await fetchExtensions().then((res) => {
    res.map((value: any) => {
      switch (installedBasename.includes(value.filename)) {
        case true:
          mapAllExtensions.installed.push(value)
          break
        default:
          mapAllExtensions.available.push(value)
          break
      }
    })
  }).catch((error) => {
    installed.map((value, index) => {
      mapAllExtensions.installed.push({
        name: value.name,
        version: value.version,
        filename: installedBasename[index]
      })
    })
  })
  // .then(() => {
  //   ipcMain.handle(PipelineEvents.GET_EXTENSIONS, async () => installed)
  //   ipcMain.handle(PipelineEvents.GET_EXTENSIONS_FROM_GITHUB, async () => mapAllExtensions)
  // })

  return { installed, mapAllExtensions }
}

export async function handleExtensions() {
  ipcMain.handle(PipelineEvents.GET_EXTENSIONS, async () => showInstalledExtensions().then((res) => res.installed))
  ipcMain.handle(PipelineEvents.GET_EXTENSIONS_FROM_GITHUB, async () => showInstalledExtensions().then((res) => res.mapAllExtensions))
}

export async function handleExtensionsStorage() {
  ipcMain.handle(PipelineEvents.DOWNLOAD_EXTENSION, async (e, [downloadUrl, filename]: Array<string>) => {
    console.log(filename)

    axios.get(downloadUrl, {
      responseType: 'stream'
    })
      .then((res) => {
        const writer = jetpack.createWriteStream(join(extensionsPathProd, filename))
        console.log(res.data)
        res.data.pipe(writer)

        return new Promise(() => {
          writer.on('finish', () => 'finish')
          writer.on('error', () => 'error')
        })
      })
      .catch((error) => {
        console.log('Download failed')
        return 'errordl'
      })
      .then((res) => {
        console.log(res)
      })
  })

  ipcMain.handle(PipelineEvents.DELETE_EXTENSION, async (e, filename: string) => jetpack
    .cwd(extensionsPathProd)
    .removeAsync(filename)
    .then(() => 'deleted')
    .catch(() => 'error'))
}
