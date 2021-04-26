import { BrowserWindow, ipcMain } from 'electron'
import { homedir } from 'os'
import { resolve, basename } from 'path'
import * as jetpack from 'fs-jetpack'
import { RibozillaExtensionValidator } from '@ribozilla/extension-api'

const homePath = homedir()
const appPath = resolve(homePath, '.ribozilla')
const extensionsPath = resolve(appPath, 'extensions')
const recentProjects = resolve(appPath, 'recents  .json')
const appConfig = resolve(appPath, 'config.json')
const folderExists = jetpack.exists(jetpack.path(appPath)) && jetpack.exists(jetpack.path(extensionsPath))

function createAppPath(folderExists: boolean) {
  jetpack
    .cwd(homePath)
    .dir(appPath)
    .dir(extensionsPath)
}

function defaultConfig() {
  jetpack.cwd(appPath)
}

function extensionValidation(manifest: JSON) {

}

export function loadExtensions() {
  const extensionsPath = jetpack.find('extensions', { matching: ['*manifest.json', '!node_modules/**/*'], directories: false })
  const extensionValidator = new RibozillaExtensionValidator()

  ipcMain.handle('buu', () => 'uiuiui')

  extensionsPath.map(async (value) => {
    await jetpack.readAsync(value, 'json')
      .then((extension) => {
        if (extensionValidator.validate(extension)) {
          console.log(extension)
        } else {
          console.log(`\x1b[31mMain fields are missing ${basename(value)}`)
        }
      })
      .catch((errno) => {
        console.log(`\x1b[31mIt appears has some problem with extension file: ${basename(value)}`)
      })
  })
}
