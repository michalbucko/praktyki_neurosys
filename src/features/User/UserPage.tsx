import { Redirect, Switch, useRouteMatch } from 'react-router'
import { PrivateRoute } from 'routes/PrivateRoute'
import { StyledContainer } from 'components/StyledContainer/StyledContainer'
import { Notification } from 'shared/Notification/Notification/Notification'
import { toList, toAddUser, toEditItem } from './routes'
import { UsersTable } from './components/UsersTable/UsersTable'
import { UserForm } from './components/UserForm/UserForm'
import { UserDetails } from './components/UserDetails/UserDetails'

export const UserPage = (): JSX.Element => {
  const { path } = useRouteMatch()

  return (
    <StyledContainer>
      <Notification />
      <Switch>
        <PrivateRoute path={`${path}${toList}/:id`} component={UserDetails} />
        <PrivateRoute path={`${path}${toEditItem}/:id`} component={UserForm} />
        <PrivateRoute path={`${path}${toList}`} component={UsersTable} />
        <PrivateRoute path={`${path}${toAddUser}`} component={UserForm} />
        <PrivateRoute path={`${path}`} exact component={() => <Redirect to={`${path}${toList}`} />} />
      </Switch>
    </StyledContainer>
  )
}
