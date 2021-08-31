import { Dashboard } from 'features/Dashboard/Dashboard'
import { HardwarePage } from 'features/HardwarePage/HardwarePage'
import { SoftwarePage } from 'features/SoftwarePage/SoftwarePage'
import { UserPage } from 'features/User/UserPage'
import { Redirect, Route, Switch } from 'react-router-dom'

export const toUsersPage = '/users'
export const toSoftwarePage = '/software'
export const toHardwarePage = '/hardware'
export const toDashboard = '/dashboard'

export const Routes = () => {
  return (
    <Switch>
      <Route path={toDashboard} component={Dashboard} />
      <Route path={toHardwarePage} component={HardwarePage} />
      <Route path={toUsersPage} component={UserPage} />
      <Route path={toSoftwarePage} component={SoftwarePage} />
      <Route path="/" exact>
        <Redirect to={toDashboard} />
      </Route>
    </Switch>
  )
}
