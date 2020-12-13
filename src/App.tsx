import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'

import Workspace from '@screens/workspace'
import store from '@store'

const history = createHashHistory()

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Workspace />
      </Router>
    </Provider>
  )
}
