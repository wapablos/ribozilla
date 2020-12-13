import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Toolbar } from '@material-ui/core'

import { ISidebar } from '@components/Sidebar'
import TaskScreen from './styles.routes'

export default function Routes({ tasks } : ISidebar) {
  return (
    <TaskScreen>
      <Toolbar />
      <Switch>
        {tasks.map(({ href, component }, index) => (
          <Route exact path={href} component={component} key={`${index.toString()}${href}`} />
        ))}
      </Switch>
    </TaskScreen>
  )
}
