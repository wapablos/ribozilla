import { RibozillaSchema } from '@ribozilla/extension-api'

export enum ExtensionsActionTypes {
    LOAD_REQUEST='@@extensions/LOAD_REQUEST',
    LOAD_SUCCESS='@@extensions/LOAD_SUCCESS',
    LOAD_FAILURE='@@extensions/LOAD_FAILURE'
}

export interface ExtensionsState {
    readonly extensions: RibozillaSchema[]
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
}
