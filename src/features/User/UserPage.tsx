import UserAddForm from 'features/User/components/UserAddForm/UserAddForm'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router'
import UsersList from 'features/User/components/UserList/UserList'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { toList, toAddUser, toEditItem } from './routes'

const useStyles = makeStyles({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 25,
  },
})

export const UserPage = () => {
  const { container } = useStyles()

  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}${toEditItem}/:id`}>
        <Container className={container} maxWidth="md">
          <UserAddForm />
        </Container>
      </Route>
      <Route path={`${path}${toList}`}>
        <Container className={container} maxWidth="md">
          <UsersList />
        </Container>
      </Route>
      <Route path={`${path}${toAddUser}`}>
        <Container className={container} maxWidth="md">
          <UserAddForm />
        </Container>
      </Route>
      <Route path={`${path}`} exact>
        <Redirect to={`${path}${toList}`} />
      </Route>
    </Switch>
  )
}

export default UserPage
