import React, { useState } from 'react'
import { Link, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { List } from '@material-ui/core'
import { IconBaseProps } from 'react-icons/lib/cjs'
import { PageTemplate } from '@screens/template'
import { RoutesScreen, StyledSidebar, StyledListItem, StyledTooltip } from './styles'

export interface ITask {
  id: string
  title?: string
  href?: string
  icon?: any
  component?(): JSX.Element
  onClick?(): void
}

export interface ISidebar {
  main?: ITask[]
  extras?: ITask[]
  tasks?: ITask[]
}

function MenuIcon({ id, icon, ...props } : ITask & IconBaseProps) {
  return (
    React.createElement(icon || 'div', props)
  )
}

export function Routes({ main, extras } : ISidebar) {
  const routes = [...main, ...extras]

  return (
    <RoutesScreen>
      <Switch>
        {routes.map(({ href, component }, index) => (
          <Route exact path={href || '?'} component={component || PageTemplate} key={`${index.toString()}`} />
        ))}
        <Redirect exact from="/" to="projects" />
      </Switch>
    </RoutesScreen>
  )
}

export default function Sidebar({ main, extras } : ISidebar) {
  const { pathname } = useLocation()
  const [selected, setSelected] = useState(pathname === '/' ? '/projects' : pathname)

  const handleListItemClick = (href: string, onClick?: () => void) => {
    if (href === undefined && typeof onClick === 'function') onClick()
    else setSelected(href || selected)
  }

  const ActivityList = ({ tasks } : ISidebar) => (
    <List>
      {tasks.map(({ id, title, href, icon, onClick }, index) => (
        <StyledTooltip title={title} key={index.toString()}>
          <StyledListItem selected={selected === href} component={Link} to={href || '?'} key={index.toString()} onClick={() => handleListItemClick(href, onClick)}>
            {icon === undefined ? '*' : <MenuIcon id={id} icon={icon} size={28} />}
          </StyledListItem>
        </StyledTooltip>
      ))}
    </List>
  )

  return (
    <StyledSidebar>
      <ActivityList tasks={main} />
      <ActivityList tasks={extras} />
    </StyledSidebar>
  )
}
