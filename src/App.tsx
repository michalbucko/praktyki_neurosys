import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={toHardwarePage} exact />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
