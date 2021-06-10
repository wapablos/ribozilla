import { BrowserWindow, ipcMain } from 'electron'
import { homedir } from 'os'
import { resolve, basename } from 'path'
import * as jetpack from 'fs-jetpack'
import { RibozillaExtensionValidator } from '@ribozilla/extension-api'
import { PipelineEvents, FileBrowserEvents } from '@constants/events'
import Store from 'electron-store'
import { IProjectMeta } from '@constants/interfaces'

export interface RecentsSchema {
  recents: IProjectMeta[]
}

export const homePath = homedir()
export const appPath = resolve(homePath, '.ribozilla')
export const extensionsPath = resolve(appPath, 'extensions')
export const recentsBasename = 'recents'
export const recentProjects = resolve(appPath, `${recentsBasename}.json`)
export const appConfig = resolve(appPath, 'config.json')

export function checkAppConfigFiles() {
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
}

export async function loadExtensions() {
  const extensionsPath = jetpack.find('extensions', { matching: ['*manifest.json', '!node_modules/**/*'], directories: false })
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
