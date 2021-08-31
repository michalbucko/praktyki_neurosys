import { UserAddForm } from 'features/User/components/UserAddForm/UserAddForm'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router'
import { UsersList } from 'features/User/components/UserList/UserList'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
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
        <Route path={`${path}${toEditItem}/:id`} component={UserAddForm} />
        <Route path={`${path}${toList}`} component={UsersList} />
        <Route path={`${path}${toAddUser}`} component={UserAddForm} />

        <Route path={`${path}`} exact>
          <Redirect to={`${path}${toList}`} />
        </Route>
      </Switch>
    </Container>
  )
}
