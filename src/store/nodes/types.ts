import { Elements } from 'react-flow-renderer'
import { RibozillaNode } from '@screens/pipeline/internals'
import { ParamsTypes, InputTypes, RequiredTypes } from '@ribozilla/extension-api'

export enum NodesActionTypes {
    ADD_NODE='@@nodes/ADD_NODE',
    DELETE_NODE='@@nodes/DELETE_NODE',
    LOAD_NODES='@@nodes/LOAD_FAILURE'
}

export interface NodesState {
    readonly nodes: RibozillaNode[]
}

export const templateNode: RibozillaNode = {
  id: 'node-y',
  type: 'software',
  position: {
    x: 78,
    y: 52
  },
  data: {
    software: 'Super',
    command: 'The Big One',
    params: [
      {
        type: ParamsTypes.FLAG,
        signature: '--Test',
        label: 'Meu Test',
        places: 0,
        inputs: [
          {
            type: InputTypes.BOOLEAN
          }
        ],
        isRequired: RequiredTypes.COMMON_IN,
        description: 'No description'
      },
      {
        type: ParamsTypes.FLAG,
        signature: '--Test',
        label: 'Meu Test',
        places: 0,
        inputs: [
          {
            type: InputTypes.ENUM,
            values: [
              'ConcordantPair',
              'DiscordantPair'
            ]
          }
        ],
        isRequired: RequiredTypes.COMMON_IN,
        description: 'No description'
      },
      {
        type: ParamsTypes.FLAG,
        signature: '--runThreadN',
        label: 'Threads',
        places: 1,
        inputs: [
          {
            type: InputTypes.NUMBER
          }
        ],
        isRequired: RequiredTypes.COMMON_OUT,
        description: 'No description'
      },
      {
        type: ParamsTypes.FLAG,
        signature: '--genomeDir',
        label: 'Genome',
        places: 1,
        inputs: [
          {
            type: InputTypes.DIR
          }
        ],
        isRequired: RequiredTypes.MAIN_IN,
        description: 'No description'
      },
      {
        type: ParamsTypes.FLAG,
        signature: '--readFilesIn',
        label: 'Read files',
        places: -1,
        inputs: [
          {
            type: InputTypes.FILE
          }
        ],
        isRequired: RequiredTypes.MAIN_IN,
        description: 'No description'
      },
      {
        type: ParamsTypes.FLAG,
        signature: '--alignEndsProtrude',
        label: 'Protrusion ends',
        places: 2,
        inputs: [
          {
            type: InputTypes.NUMBER
          },
          {
            type: InputTypes.ENUM,
            values: [
              'ConcordantPair',
              'DiscordantPair'
            ]
          }
        ],
        isRequired: RequiredTypes.COMMON_IN,
        description: 'No description'
      },
      {
        type: ParamsTypes.ARG,
        signature: 'out',
        label: 'My Output',
        places: -1,
        inputs: [
          {
            type: InputTypes.FILE
          }
        ],
        isRequired: RequiredTypes.MAIN_OUT,
        description: 'No description'
      }
    ]
  }
}
