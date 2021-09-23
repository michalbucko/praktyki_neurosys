import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { Button, Typography, Box, Drawer as DrawerWrapper, Theme } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import DevicesIcon from '@material-ui/icons/Devices'
import { makeStyles } from '@material-ui/styles'
import Loader from 'components/Loader/Loader'
import { useDispatchLocation, useSelectLocation } from 'shared/location/locationSlice'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Column } from '@material-table/core'
import { Location } from 'shared/location/types'
import { useDispatchNotification } from 'shared/Notification/notificationsSlice'
import { NotificationType } from 'shared/Notification/types'
import { toList } from '../routes'
import { useDispatchDevices, useSelectHardware } from '../hardwareSlice'
import { HardwareForm } from './HardwareForm/HardwareForm'
import { Drawer } from '../../../shared/Drawer/Drawer'
import { DeviceBrand } from '../types'

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: '40vw',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      width: '60vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
  },
}))

export const HardwareFormContainer = (): JSX.Element => {
  const [isBrandsActive, setIsBrandsActive] = useState(false)
  const [isLocationsActive, setIsLocationsActive] = useState(false)
  const { fetchDevice, fetchDevicesBrands, postDeviceBrand, deleteDeviceBrand, patchDeviceBrand } = useDispatchDevices()
  const { fetchLocation, postLocation, patchLocation, deleteLocation } = useDispatchLocation()
  const { id } = useParams<{ id: string }>()
  const { push } = useHistory()
  const { devicesBrands, device } = useSelectHardware()
  const { addMessage } = useDispatchNotification()
  const { locations } = useSelectLocation()
  const { drawer } = useStyles()

  useEffect(() => {
    if (id) {
      fetchDevice(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (!device.isLoading && !device.data) {
      push(`${toHardwarePage}${toList}`)
      addMessage({
        messages: ['Failed to get device data'],
        type: NotificationType.error,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device.isLoading, device.data])

  useEffect(() => {
    fetchDevicesBrands()
    fetchLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGoBackButtonClick = () => push(`${toHardwarePage}${toList}`)

  const brandsColumns: Column<DeviceBrand>[] = [{ title: 'Device brand name', field: 'name' }]
  const locationsColumns: Column<Location>[] = [{ title: 'Location name', field: 'name' }]

  return (
    <>
      <Loader isLoading={(id ? device.isLoading : false) || devicesBrands.isLoading} objects={devicesBrands.data}>
        <Box maxWidth={800} mx="auto">
          <Box my={2} display="flex" justifyContent="space-between">
            <Button startIcon={<ArrowBack />} onClick={handleGoBackButtonClick}>
              Go back
            </Button>
            <Box>
              <Button color="primary" startIcon={<DevicesIcon />} onClick={() => setIsBrandsActive(true)}>
                Manage brands
              </Button>
              <Button color="primary" startIcon={<LocationOnIcon />} onClick={() => setIsLocationsActive(true)}>
                Manage locations
              </Button>
            </Box>
          </Box>

          <Typography variant="h2" color="primary">
            {id ? 'Edit' : 'Add new'} device:
          </Typography>
          <Box mt={2}>
            <HardwareForm />
          </Box>
        </Box>
      </Loader>
      <DrawerWrapper
        classes={{ paper: drawer }}
        anchor="right"
        open={isBrandsActive}
        onClose={() => setIsBrandsActive(false)}
      >
        <Drawer
          setIsActive={setIsBrandsActive}
          title="Manage brands"
          columns={brandsColumns}
          drawerState={devicesBrands.data}
          actions={{ post: postDeviceBrand, delete: deleteDeviceBrand, patch: patchDeviceBrand }}
        />
      </DrawerWrapper>
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
