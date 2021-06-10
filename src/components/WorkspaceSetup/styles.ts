import styled from 'styled-components'
import { Paper, Button } from '@material-ui/core'

export const WorkspaceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  max-height: 100%;
  overflow-y: auto;
  padding: 5px;
`
export const ActionButton = styled(Button).attrs({
  disableRipple: true
})`
  &.MuiButtonBase-root {
    padding: 0;
    background: linear-gradient(to top, #175dff 20%, #4f7cffdd);
    color: #FFFFFF;

    :hover{
      background: linear-gradient(to top, #175dff 20%, #4f7cff);
    }

    :active {
      background: linear-gradient(to bottom, #175dff 20%, #4f7cff);
    }

    &.mini-button {
      min-width: 22px;
      max-width: 22px;
      min-height: 22px;
      max-height: 22px;
      border: 0;
      border-radius: 0 5px 5px 0;
    }

    &.card-button {
      display: flex;
      min-width: 25px;
      min-height: 25px;
      margin: 0 2px;
      padding: 0 1px 0 5px;
      border: 1px solid transparent;
      
      background: rgba(255, 255, 255, 0);

      text-transform: capitalize;
      font-size: 0.9em;

      .side-label {
        margin: 0 5px;
        color: #FFFFFF;
      }

      :hover {
        background-color: rgba(255, 255, 255, 0.2);

        &.cancel * {
          color: #FF6347;
        }

        &.start * {
          color: #65B41B;
        }

        &.misc * {
          color: #1aa8f5;
        }
      }

      :active {
        background-color: rgba(255, 255, 255, 0.35);
      }
    }

    &.workspace-button {
      display: flex;
      gap: 4px;

      min-width: 250px;
      max-height: 30px;
      padding: 0 10px;

      background: linear-gradient(to bottom, #4a4a4a 1%, #2f2f2f);
      color: #fff;

      :hover {
        background: linear-gradient(to bottom, #4a4a4a 20%, #2f2f2f);
      }
      :active {
        background: linear-gradient(to top, #4a4a4a 5%, #2f2f2f);
      }
    }

    .button-label {
      color: #FFFFFF;
      margin: 0 8px;
    }
  }
`

export const StyledCard = styled(Paper).attrs(({ elevation, ...props }) => ({
  elevation: elevation || 3
}))`
 &.MuiPaper-root {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    min-width: 250px;
    max-width: 250px;
    min-height: 200px;
    padding-top: 10px;

    background: linear-gradient(to bottom, #4a4a4a 5%, #2f2f2f);
    
    font-family: Helvetica, sans-serif;
    font-size: 0.9em;
    
    white-space: nowrap;

    &.project {
      color: #FFFFFF;
      .project-name {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 25px;
        padding: 0 10px;

        color: #FFFFFF;
        
        font-size: 2.5ch;

        &[contentEditable] {
          outline: 0px solid transparent;
          user-select: all;
        }
      }
    }

    &.edit-project {
      height: 220px;
    }

    .card-item-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 10px;

      min-height: 25px;
      max-height: 25px;
      margin: 0 10px;
    }

    .flex-column {
      align-items: flex-start;
      flex-direction: column;
      max-height: 100%;
      row-gap: 6px;
    }

    .item-wrapper {
      display: flex;
      align-items: center;

      &.button-group {
        margin-bottom: 10px;
        flex-grow: 1;
        align-self: center;
        justify-content: center;
      }

      &.img-area {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        width: calc(100%);
        padding: 1px;
        height: 100px;  
        background: #747474;
      }
    }


    img {
      max-height: 100%;
      max-width: 150%;
      border-radius: 5px;
    }

    input {
      border-radius: 5px;
      min-height: 20px;
      border: 1px solid transparent;
      outline: 0;
      padding: 0 5px;
      /* max-width: 18ch; */

      &.side-button {
        max-width: 14ch;
        border-right: 0;
        border-radius: 5px 0 0 5px;
      }
        
      &:focus {
        border-color: #4f7cff;
      }
    }

    textarea {
      resize: none;
      border-radius: 5px;
      min-height: 70px;
      max-height: 100px;
      width: calc(100% - 10px);
      border: 0;
      padding: 5px;

      &:focus {
        outline: 0;
      }
    }

    [disabled] {
      color: #eee;
    }
 }
`
