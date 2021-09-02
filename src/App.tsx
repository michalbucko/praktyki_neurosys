import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Provider } from 'react-redux'
import { Routes } from 'routes/routes'
import { store } from 'store/store'
import 'fontsource-roboto'
import { Layout } from 'theme/Layout'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import { theme } from 'theme/theme'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BrowserRouter>
            <Layout>
              <Routes />
            </Layout>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
