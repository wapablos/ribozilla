export enum AppEvents {
  TOOGLE_DEVTOOLS='@@APP/TOOGLE_DEVTOOLS',
  QUIT='@@APP/QUIT'
}

export enum WindowControlsEvents {
  MINIMIZE='@@WIN_CTRL/MINIMIZE',
  MAXIMIZE='@@WIN_CTRL/MAXIMIZE',
  CLOSE='@@WIN_CTRL/CLOSE'
}

export enum PipelineEvents {
  GET_EXTENSIONS='@@PIPE/GET_EXTENSIONS'
}

export enum FileBrowserEvents {
  CHOOSE_DIR= '@@FILE_BROWSER/CHOOSE_DIR',
  CHOOSE_FILE = '@@FILE_BROWSER/CHOOSE_FILE'
}

export enum ReadWriteEvents {
  WRITE_FILE='@@RW/WRITE_FILE',
  WRITE_FILE_ERROR='@@RW/WRITE_FILE_ERROR'
}

export enum ProjectsEvents {
  GET_RECENTS='@@PROJ/GET_RECENTS',
  RES_RECENTS='@@PROJ/RES_RECENTS',
  UPDATE='@@PROJ/UPDATE'
}
