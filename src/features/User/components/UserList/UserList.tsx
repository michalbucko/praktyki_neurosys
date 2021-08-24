import { Box, Button, List, Typography } from '@material-ui/core'
import { toUsersPage } from 'routes/routes'
import { AddCircle } from '@material-ui/icons'
import { useHistory } from 'react-router'
import Users from 'features/User/components/UserList/Users'
import { toAddUser } from '../../routes'

export const UsersList = () => {
  const { push } = useHistory()

  return (
    <List className="list">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" color="primary">
          Users
        </Typography>
        <Button startIcon={<AddCircle />} onClick={() => push(`${toUsersPage}${toAddUser}`)}>
          Add new user
        </Button>
      </Box>
      <Box mt={2}>
        <Users />
      </Box>
    </List>
  )
}

export default UsersList
