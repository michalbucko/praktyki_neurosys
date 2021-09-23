import React, { useEffect } from 'react'
import { Typography, Button, Box, Theme } from '@material-ui/core'
import { toHardwarePage } from 'routes/routes'
import AddCircle from '@material-ui/icons/AddCircle'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/styles'
import Loader from 'components/Loader/Loader'
import { toAddItem } from '../routes'
import { HardwareTable } from './HardwareTable/HardwareTable'
import { useDispatchDevices, useSelectHardware } from '../hardwareSlice'

const useStyles = makeStyles((theme: Theme) => ({
  tableWrapper: {
    fontSize: theme.typography.body1.fontSize,
    '& > *': {
      boxShadow: 'none',
    },
  },
}))

export const HardwareListContainer = (): JSX.Element => {
  const { tableWrapper } = useStyles()
  const { push } = useHistory()
  const { devices } = useSelectHardware()
  const { fetchDevices } = useDispatchDevices()

  useEffect(() => {
    fetchDevices({
      page: devices.meta?.currentPage || 1,
      pageSize: devices.meta?.itemsPerPage || 20,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
        <Typography variant="h1" color="primary">
          Devices List
        </Typography>
        <Button startIcon={<AddCircle />} onClick={() => push(`${toHardwarePage}${toAddItem}`)}>
          Add new device
        </Button>
      </Box>
      <Loader isLoading={devices.isLoading} objects={devices.data}>
        <Box className={tableWrapper}>
          <HardwareTable />
        </Box>
      </Loader>
    </>
  )
}
