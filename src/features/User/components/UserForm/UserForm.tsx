/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { User } from 'features/User/types'
import { useHistory, useParams } from 'react-router-dom'
import { toUsersPage } from 'routes/routes'
import { Box, Button, Typography, Drawer as DrawerWrapper, makeStyles } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import Loader from 'components/Loader/Loader'
import { useDispatchLocation, useSelectLocation } from 'shared/location/locationSlice'
import { Drawer } from 'shared/Drawer/Drawer'
import { Column } from '@material-table/core'
import { Location } from 'shared/location/types'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { toList } from '../../routes'
import { useSelectUsers } from '../../usersSlice'
import { UserFormFields } from './UserFormFields'

export type FormValues = Omit<User, 'id'>

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '40vw',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '60vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
  },
}))

export const UserForm = () => {
  const [isLocationsActive, setIsLocationsActive] = useState(false)
  const { drawer } = useStyles()
  const params = useParams<{ id?: string }>()
  const isEditForm = !!params.id
  const { userToEdit } = useSelectUsers()
  const { locations } = useSelectLocation()
  const { push } = useHistory()
  const { postLocation, patchLocation, deleteLocation } = useDispatchLocation()
  const locationsColumns: Column<Location>[] = [{ title: 'Location name', field: 'name' }]

  return (
    <>
      <Box maxWidth={800} mx="auto">
        <Box my={1} display="flex" justifyContent="space-between">
          <Button startIcon={<ArrowBack />} onClick={() => push(`${toUsersPage}${toList}`)}>
            Go back
          </Button>
          <Button color="primary" startIcon={<LocationOnIcon />} onClick={() => setIsLocationsActive(true)}>
            Manage locations
          </Button>
        </Box>

        <Typography variant="h2" color="primary">
          {isEditForm ? 'Edit user' : 'Add new user'}
        </Typography>

        <Loader isLoading={userToEdit.isLoading || locations.isLoading} objects={[userToEdit.data]}>
          <UserFormFields />
        </Loader>
      </Box>

      <DrawerWrapper
        classes={{ paper: drawer }}
        anchor="right"
        open={isLocationsActive}
        onClose={() => setIsLocationsActive(false)}
      >
        <Drawer
          setIsActive={setIsLocationsActive}
          title="Manage locations"
          columns={locationsColumns}
          drawerState={locations.data}
          actions={{ post: postLocation, delete: deleteLocation, patch: patchLocation }}
        />
      </DrawerWrapper>
    </>
  )
}
