import styled from 'styled-components'
import { List, ListItem } from '@material-ui/core'
import { StyledListItem } from '@screens/pipeline/styles'

export const ExtensionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 100%;
  overflow: hidden;
`
export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #282a36;
  
  width: 220px;
  max-height: 100%;

  font-family: --apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.7em;
  font-weight: 700;
`

export const StyledList = styled(List).attrs({
  disablePadding: true
})`
  &.MuiList-root {
    overflow-y: auto;
    min-height: calc(7 * 24px);

    &:nth-child(2) {
      max-height: calc(50% - 24px);
    }

    &::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.15);
      :hover {
        background-color: rgba(255, 255, 255, 0.25);
      }
    }
  }
`

export const ExtensionsStyledListItem: typeof ListItem = styled(StyledListItem)`
  &.MuiListItem-root {
    margin-top: 1px;

    &.MuiListItem-button {
    &.software {
      .mini-action {
        :hover {
          &.installed { color: #FF6347; }
          &.available { color: #1aa8f5; }
        }
      }
    }
  }
  }
`
