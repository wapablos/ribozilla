export enum AppEvents {
  QUIT='@@APP/QUIT'
}
export enum SystemInfoEvents {
  REQUEST='@@SYSTEM_INFO/REQUEST',
  RESPONSE='@@SYSTEM_INFO/REQUEST'
}

export enum DevToolsEvents {
  TOOGLE='@@DEV_TOOLS/TOOGLE'
}

export enum FileBrowserEvents {
  CHOOSE_DIR= '@@FILE_BROWSER/CHOOSE_DIR'
}

export enum ReadWriteEvents {
  WRITE_NEW_FILE='@@READ_WRITE/WRITE_NEW_FILE'
}
