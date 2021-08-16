import UserPage from 'features/User/UserPage'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { toHardwarePage, toUsersPage } from 'routes/routes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={toHardwarePage} exact />
          <Route path={toUsersPage} exact component={UserPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
