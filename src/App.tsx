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
import { useDispatchLogin } from 'features/LoginPage/LoginSlice'
import { useEffect } from 'react'

function App() {
  return (
    <Provider store={store}>
      <OtherProviders />
    </Provider>
  )
}

const OtherProviders = () => {
  const { logPending } = useDispatchLogin()
  useEffect(() => {
    logPending()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter>
          <Switch>
            <PrivateRouteLogin path={toLoginPage} component={LoginPage} />
            <MainRoutes />
          </Switch>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default App
