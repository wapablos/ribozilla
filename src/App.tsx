import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Workspace from '@screens/workspace'
import store from '@store/.'

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Workspace />
      </HashRouter>
    </Provider>
  )
}
