import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { AppBar, IconButton } from '@material-ui/core'
import { baseFeatures } from '@constants/styles'
import 'react-electron-window-menu/dist/style.css'

export const MenubarStyles = createGlobalStyle`    
    .rewm-contextmenu {
        background-color: rgba(66, 66, 69, 0.95);
        color: #FFFFFF;
        border: 1px solid #8D8D92;
        border-top-width: 0;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
        
        [data-ctx-item] {
            font-family: Helvetica;
        }

        [data-ctx-separator] {
            background-color: rgba(158,158,158,0.7);
            filter: blur(0.5px);
        }
    }

    .rewm-menubar {
        [data-menubar-item] {
            color: #FFFFFF;
            height: ${baseFeatures.titlebarHeight}px;
            -webkit-app-region: no-drag;
        }
    }
`

const rotate = keyframes`
  from {
    background-position: 0%;
  }

  to {
    background-position: 400%;
  }
`

export const MenuBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-family: Helvetica;    
    font-size: 0.90em;

    .app-name {
        padding: 0 15px;
        font-weight: 600;
        text-align: center;
        color: #FFFFFF;

        :hover {
            background: linear-gradient(135deg, #bcc6cc, #eee, #bcc6cc);
            background-size: 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: ${rotate} 2s linear infinite;
        }
    }
    
    .project-title {
        color: yellowgreen;
        margin: auto;
    }
`

export const WindowControlsContainer = styled.div`
    display: flex;
    right: 0;
    margin-left: 10%;
`

export const StyledIconButton: typeof IconButton = styled(IconButton).attrs({
  disableRipple: true,
  size: 'small'
})`
    &.MuiIconButton-root {
        border-radius: 0;
        height: ${baseFeatures.titlebarHeight}px;
        width: 40px;
        color: white;
        padding: 0 12px;
        cursor: default;

        :hover {
            color: #FFFFFF;
            background-color: #FFFFFF1A;
        }

        &.close:hover {
            color: #FFFFFF;
            background-color: #E81123;
            opacity: 90%;
        }
    }
        
`

export const StyledAppBar = styled(AppBar)`
    &.MuiAppBar-root {
        background-color: rgba(33, 34, 44, 0.9);
        height: ${baseFeatures.titlebarHeight}px;
        -webkit-app-region: drag;
        -webkit-user-select: none;
    }
`
