import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ISidebar } from '@components/Sidebar'
import { RoutesScreen } from './styles'

export default function Routes({ tasks } : ISidebar) {
  return (
    <RoutesScreen>
      <Switch>
        {tasks.map(({ href, component }, index) => (
          <Route exact path={href} component={component} key={`${index.toString()}${href}`} />
        ))}
      </Switch>
    </RoutesScreen>
  )
}
