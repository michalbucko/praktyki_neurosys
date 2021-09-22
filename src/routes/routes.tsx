import { Switch, Redirect } from 'react-router-dom'

import { Dashboard } from 'features/Dashboard/Dashboard'
import { HardwarePage } from 'features/HardwarePage/HardwarePage'
import { UserPage } from 'features/User/UserPage'
import { SoftwarePage } from 'features/SoftwarePage/SoftwarePage'
import { OperationTableWrapper } from '../features/OperationHistoryTable/OperationTableWrapper'
import { PrivateRoute } from './PrivateRoute'

export const toSoftwarePage = '/software'
export const toLoginPage = '/login'
export const toHardwarePage = '/hardware'
export const toUsersPage = '/users'
export const toDashboard = '/dashboard'
export const toHistoryPage = '/history'

export const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path={toDashboard} component={Dashboard} />
      <PrivateRoute path={toHardwarePage} component={HardwarePage} />
      <PrivateRoute path={toSoftwarePage} component={SoftwarePage} />
      <PrivateRoute path={toUsersPage} component={UserPage} />
      <PrivateRoute path={toHistoryPage} component={OperationTableWrapper} />
      <Redirect to={toDashboard} />
    </Switch>
  )
}
