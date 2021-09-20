/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, List, Typography } from '@material-ui/core'
import { toUsersPage } from 'routes/routes'
import { AddCircle } from '@material-ui/icons'
import { useHistory } from 'react-router'
import { Users } from 'features/User/components/UserList/Users'
import Loader from 'features/User/Loader'
import { useDisptachUsers, useSelectUsers } from 'features/User/usersSlice'
import { useEffect } from 'react'
import { toAddUser } from '../../routes'

export const UsersList = () => {
  const { push } = useHistory()
  const { users } = useSelectUsers()
  const { fetchUsers } = useDisptachUsers()

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Loader isLoading={users.isLoading} objects={users.data}>
      <List>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h1" color="primary">
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
    </Loader>
  )
}
