import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'
import { Provider } from 'react-redux'
import { Routes } from 'routes/routes'
import { store } from 'store/store'
import 'fontsource-roboto'

function App() {
  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <Routes />
        </div>
      </MuiPickersUtilsProvider>
    </Provider>
  )
}

export default App
