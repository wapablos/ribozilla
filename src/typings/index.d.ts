/**
 * Interface to make electron acessible on renderer process
 */

interface Window {
  electron: {
    ipcRenderer: {
      hello(): void;
      on(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void): Electron.IpcRenderer;
      once(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void): Electron.IpcRenderer;
      invoke(channel: string, ...args: any[]): Promise<any>;
      send(channel: string, ...args: any[]): void;
      sendTo(webContentsId: number, channel: string, ...args: any[]): void;
      sendSync(channel: string, ...args: any[]): any;
      sendToHost(channel: string, ...args: any[]): void;
      removeListener(channel: string, listener: (...args: any[]) => void): Electron.IpcRenderer;
      removeAllListeners(channel: string): Electron.IpcRenderer;
      eventNames(): (string | symbol)[]
    }
  }
}
