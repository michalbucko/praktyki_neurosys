import Button from 'components/Button/Button'
import { List } from 'components/List'
import { ListItem } from 'components/List/ListItem'
import { Link, useHistory } from 'react-router-dom'
import { toUsersPage } from 'routes/routes'
import styled from 'styled-components'
import { toAddUser, toEditItem } from '../routes'
import { useDisptachUsers, useSelectUsers } from '../usersSlice'

export const UsersList = () => {
  const { users } = useSelectUsers()
  const { push } = useHistory()
  const { removeUser } = useDisptachUsers()

  return (
    <StyledList divider header="Users">
      <>
        {users.map((user) => (
          <ListItem
            key={user.id}
            primaryText={`${user.firstName} ${user.lastName}`}
            secondaryText={`${user.location} - ${user.position}`}
            Buttons={
              <>
                <Button onClick={() => push(`${toUsersPage}${toEditItem}/${user.id}`)}>Edit</Button>
                <Button onClick={() => removeUser(user.id)}>Remove</Button>
              </>
            }
          />
        ))}
        <Link to={`${toUsersPage}${toAddUser}`}>Add new user</Link>
      </>
    </StyledList>
  )
}

const StyledList = styled(List)`
  width: 500px;
`

export default UsersList
