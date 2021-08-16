import { HarwarePage } from 'features/HarwarePage'
import UserPage from 'features/User/UserPage'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

export const toUsersPage = '/users'
export const toSoftwarePage = '/software'
export const toHardwarePage = '/hardware'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={toHardwarePage} component={HarwarePage} />
        <Route path={toUsersPage} exact component={UserPage} />
        <Route path="/" exact>
          <Redirect to={toHardwarePage} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
