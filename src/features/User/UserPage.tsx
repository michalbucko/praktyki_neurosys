import { UserAddForm } from 'features/User/components/UserAddForm/UserAddForm'
import { Redirect, Switch, useRouteMatch } from 'react-router'
import { UsersList } from 'features/User/components/UserList/UserList'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { PrivateRoute } from 'routes/PrivateRoute'
import { toList, toAddUser, toEditItem } from './routes'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
}))

export const UserPage = (): JSX.Element => {
  const { container } = useStyles()
  const { path } = useRouteMatch()

  return (
    <Container className={container} maxWidth="md">
      <Switch>
        <PrivateRoute path={`${path}${toEditItem}/:id`} component={UserAddForm} />
        <PrivateRoute path={`${path}${toList}`} component={UsersList} />
        <PrivateRoute path={`${path}${toAddUser}`} component={UserAddForm} />
        <PrivateRoute path={`${path}`} exact component={() => <Redirect to={`${path}${toList}`} />} />
      </Switch>
    </Container>
  )
}
