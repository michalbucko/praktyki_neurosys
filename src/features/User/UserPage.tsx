import UserAddForm from 'features/User/components/UserAddForm'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router'
import UsersList from 'features/User/components/UserList'
import styled from 'styled-components'
import { toList, toAddUser, toEditItem } from './routes'

export const UserPage = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}${toEditItem}/:id`}>
        <Wrapper>
          <UserAddForm />
        </Wrapper>
      </Route>
      <Route path={`${path}${toList}`}>
        <Wrapper>
          <UsersList />
        </Wrapper>
      </Route>
      <Route path={`${path}${toAddUser}`}>
        <Wrapper>
          <UserAddForm />
        </Wrapper>
      </Route>
      <Route path={`${path}`} exact>
        <Redirect to={`${path}${toList}`} />
      </Route>
    </Switch>
  )
}

const Wrapper = styled.div`
  max-width: 800px;
  margin: 20px auto;
  background-color: white;
  padding: 15px;
`

export default UserPage
