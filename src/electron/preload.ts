import { contextBridge, ipcRenderer, BrowserWindow } from 'electron'

console.log('Electron preload was initialized')

const api : Partial<Window> = {
  electron: {
    hello: () => {
      console.log('Preloaded Hello World!')
    },
    ipcRenderer
  }
}

contextBridge.exposeInMainWorld('electron', api.electron)
contextBridge.exposeInMainWorld('process', window.process)

/**
 * A apiKey 'electron' deve ter o mesmo nome da chave
 * implementada na interface global Window 'src/typings/index.d.ts
 * Pois é a chave 'electron' que estará sendo exposta na variavel window,
 * assim como as definições da variável local 'api'
 */
