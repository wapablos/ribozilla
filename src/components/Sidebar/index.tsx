import React from 'react'
import { Link } from 'react-router-dom'
import {
  List, ListItem, ListItemText, MuiThemeProvider, Drawer
} from '@material-ui/core'

import { StyledSidebar } from './styles'

export interface ITask {
  title?: string
  href?: string
  component?(): JSX.Element
  icon?: any
  onClick?(): void
}

export interface ISidebar {
  tasks: ITask[]
}

export default function Sidebar({ tasks } : ISidebar) {
  return (
    <StyledSidebar>
      <List>
        {tasks.map(({
          title, href, icon, onClick
        }, index) => (
          <ListItem button component={Link} to={href} key={index.toString()} onClick={onClick}>
            {icon}
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </StyledSidebar>
  )
}
