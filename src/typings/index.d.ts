/**
 * Interface to make electron acessible on renderer process
 */

interface Window {
  electron: {
    hello?(): void
    ipcRenderer?: Electron.IpcRenderer
  }
}
