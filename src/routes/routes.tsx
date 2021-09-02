import { Route, Switch, Redirect } from 'react-router-dom'
import { LoginPage } from 'features/LoginPage/LoginPage'

import { Dashboard } from 'features/Dashboard/Dashboard'
import { HardwarePage } from 'features/HardwarePage/HardwarePage'
import { UserPage } from 'features/User/UserPage'
import { SoftwarePage } from 'features/SoftwarePage/SoftwarePage'
import { PrivateRoute } from './PrivateRoute'

export const toSoftwarePage = '/software'
export const toLoginPage = '/login'
export const toHardwarePage = '/hardware'
export const toUsersPage = '/users'
export const toDashboard = '/dashboard'

export const Routes = () => {
  return (
    <Switch>
      <Route path={toLoginPage} component={LoginPage} />
      <PrivateRoute path={toDashboard} component={Dashboard} />
      <PrivateRoute path={toHardwarePage} component={HardwarePage} />
      <PrivateRoute path={toSoftwarePage} component={SoftwarePage} />
      <PrivateRoute path={toUsersPage} component={UserPage} />
      <Redirect to={toDashboard} />
    </Switch>
  )
}
