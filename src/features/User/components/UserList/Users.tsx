import { Box, Button, Divider, ListItem, ListItemText } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
import { toEditItem } from 'features/User/routes'
import { useDisptachUsers, useSelectUsers } from 'features/User/usersSlice'
import { Fragment } from 'react'
import { useHistory } from 'react-router'
import { toUsersPage } from 'routes/routes'

export const Users = (): JSX.Element => {
  const { push } = useHistory()
  const { users } = useSelectUsers()
  const { removeUser } = useDisptachUsers()

  return (
    <>
      {users.map((user) => (
        <Fragment key={user.id}>
          <ListItem disableGutters>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={`${user.location}`} />
            <Box display="grid" gridAutoFlow="column" gridColumnGap={10}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<Edit />}
                disableElevation
                onClick={() => push(`${toUsersPage}${toEditItem}/${user.id}`)}
              >
                Edit
              </Button>
              <Button variant="contained" startIcon={<Delete />} disableElevation onClick={() => removeUser(user.id)}>
                Remove
              </Button>
            </Box>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </>
  )
}

export default Users
