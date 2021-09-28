import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import 'fontsource-roboto'
import { Switch, BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import { theme } from 'theme/theme'
import { toLoginPage } from 'routes/routes'
import { LoginPage } from 'features/LoginPage/LoginPage'
import { MainRoutes } from 'routes/mainRoutes'
import { PrivateRouteLogin } from 'routes/PrivateRouteLogin'
import { Notification } from 'shared/Notification/Notification/Notification'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BrowserRouter>
            <Notification />
            <Switch>
              <PrivateRouteLogin path={toLoginPage} component={LoginPage} />
              <MainRoutes />
            </Switch>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
