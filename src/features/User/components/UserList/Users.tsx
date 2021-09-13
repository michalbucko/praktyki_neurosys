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

  const onRemove = (id: number) => {
    removeUser(id)
  }

  return (
    <>
      {users.data.map((user, mapIndex) => (
        <Fragment key={user.id}>
          {mapIndex > 0 && <Divider />}
          <ListItem disableGutters>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={`${user.position}`} />
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
              <Button
                color="secondary"
                variant="contained"
                startIcon={<Delete />}
                disableElevation
                onClick={() => onRemove(user.id)}
              >
                Remove
              </Button>
            </Box>
          </ListItem>
        </Fragment>
      ))}
    </>
  )
}
