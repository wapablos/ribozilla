import { BrowserWindow, ipcMain } from 'electron'
import { homedir } from 'os'
import { resolve, basename, join } from 'path'
import * as jetpack from 'fs-jetpack'
import { RibozillaExtensionValidator } from '@ribozilla/clui-api'
import { PipelineEvents, FileBrowserEvents } from '@constants/events'
import Store from 'electron-store'
import { IProjectMeta } from '@constants/interfaces'
import { fetchExtensions } from './extensionsFromGithub'

export interface RecentsSchema {
  recents: IProjectMeta[]
}

// TODO: Add json validator to the software files
export const homePath = homedir()
export const appPath = resolve(homePath, '.ribozilla')
export const extensionsPath = resolve(appPath, 'ribozilla-extensions')
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

  console.log(extensions)
  ipcMain.handle(PipelineEvents.GET_EXTENSIONS, async () => extensions)
}

export async function showExtensions() {
  const extensionsPath = jetpack.find(installedExtensions, { matching: ['*manifest.json', '!node_modules/**/*'], directories: false })
}
