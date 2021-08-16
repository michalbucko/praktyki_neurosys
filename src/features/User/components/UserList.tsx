import Button, { ButtonSize } from 'components/Button/Button'
import { List } from 'components/List'
import { ListItem } from 'components/List/ListItem'
import { User } from 'features/User/UserPage'
import styled from 'styled-components'

type Props = {
  users: User[]
  onRemove: (userId: number) => void
}

export const UsersList = ({ users, onRemove }: Props) => {
  return (
    <List border divider header="Użytkownicy">
      <ListElements>
        {users.map((user) => (
          <ListElement key={user.id}>
            <ListItem
              primaryText={`${user.firstName} ${user.lastName}`}
              secondaryText={`${user.location} - ${user.position}`}
            />
            <Button size={ButtonSize.small} onClick={() => onRemove(user.id)}>
              Remove
            </Button>
          </ListElement>
        ))}
      </ListElements>
    </List>
  )
}

const ListElements = styled.div`
  display: grid;
  row-gap: 30px;
`
const ListElement = styled.div`
  border: 1px solid #ddd;
  padding: 10px 5px;
  display: grid;
  row-gap: 10px;
`

export default UsersList
