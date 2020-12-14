import { contextBridge, ipcRenderer } from 'electron'

console.log('Oizão')

const api : Partial<Window> = {
  electron: {
    hello: () => {
      console.log('Preloaded Hello World!')
    },
    send: (channel, data: any[]) => {
      ipcRenderer.send(channel, data)
    },
    once: (channel, listener) => ipcRenderer.once(channel, listener),
    invoke: (channel, args: any[]) => ipcRenderer.invoke(channel, args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    sendTo: (webContentsId, channel, args: any[]) => ipcRenderer.sendTo(webContentsId, channel, args),
    sendSync: (channel, args: any[]) => ipcRenderer.sendSync(channel, args),
    sendToHost: (channel, args: any[]) => ipcRenderer.sendToHost(channel, args),
    removeListener: (channel, listener) => ipcRenderer.removeListener(channel, listener),
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
  }
}

contextBridge.exposeInMainWorld('electron', api.electron)

/**
 * A apiKey 'electron' deve ter o mesmo nome da chave
 * implementada na interface global Window, pois é a chave
 * 'electron' que estará sendo exposta na variavel window,
 * assim como as definições da variável local 'api'
 */