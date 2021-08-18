import React from 'react'
import { Provider } from 'react-redux'
import { Routes } from 'routes/routes'
import { store } from 'store/store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  )
}

export default App
