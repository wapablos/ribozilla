export enum TitlebarActionTypes {
  MAXIMIZE='@@titlebar/MAXIMIZE',
}

export interface TitlebarState {
  readonly isMaximized: boolean
}
