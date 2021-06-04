import { BrowserWindow, ipcMain } from 'electron'
import { homedir } from 'os'
import { resolve, basename } from 'path'
import * as jetpack from 'fs-jetpack'
import { RibozillaExtensionValidator } from '@ribozilla/extension-api'
import { PipelineEvents, FileBrowserEvents } from '@constants/events'

const homePath = homedir()
const appPath = resolve(homePath, '.ribozilla')
const extensionsPath = resolve(appPath, 'extensions')
const recentProjects = resolve(appPath, 'recents.json')
const appConfig = resolve(appPath, 'config.json')
const folderExists = jetpack.exists(jetpack.path(appPath)) && jetpack.exists(jetpack.path(extensionsPath))

function createAppPath(folderExists: boolean) {
  jetpack
    .cwd(homePath)
    .dir(appPath)
    .dir(extensionsPath)
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
