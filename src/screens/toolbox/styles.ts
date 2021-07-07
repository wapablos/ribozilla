import styled from 'styled-components'
import { StyledNode } from '@screens/pipeline/styles'

export const ToolboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #ccc;
  padding: 5px; 
  row-gap: 8px;
  overflow-y: auto;
`

export const StyledCard = styled(StyledNode)`
  &.MuiPaper-root {
    height: 120px;
    justify-content: center;
    margin: 0;
    background: linear-gradient(to right, #0d0d0d, #040404);

    .node-label {
      margin: 0;
    }
    
    .button-group {
      display: flex;
      column-gap: 8px;
    }

    .card-button:hover {

        &.save {
          color: #1aa8f5;
        }

        &.copy {
          color: #FFD700;
        }

        &.edit {
          color: #00fa9a;
        }
      }

    textarea {
      resize: none;
      padding: 5px;
      border-radius: 0 0 5px 5px;
      width: calc(100% - 10px);
      height: calc(100% - 31px);
      border: 0;

      &:focus {
        outline: 0;
      }
    }

    [disabled] {
      color: #fff;
    }
  }
`
