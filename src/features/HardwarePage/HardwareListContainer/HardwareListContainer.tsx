import React, { useEffect } from 'react'
import { List, Typography, Button, Box } from '@material-ui/core'
import { toHardwarePage } from 'routes/routes'
import AddCircle from '@material-ui/icons/AddCircle'
import { useHistory } from 'react-router'
import Loader from 'components/Loader/Loader'
import { makeStyles } from '@material-ui/styles'
import { toAddItem } from '../routes'
import { HardwareTable } from './HardwareTable/HardwareTable'
import { useDispatchDevices, useSelectHardware } from '../hardwareSlice'

const useStyles = makeStyles({
  list: {
    '& li': {
      borderBottom: '1px solid #cccc',
    },
    '& li:last-child': {
      borderBottom: 'none',
    },
  },
})

export const HardwareListContainer = (): JSX.Element => {
  const { list } = useStyles()
  const { push } = useHistory()
  const { devices } = useSelectHardware()
  const { fetchDevices } = useDispatchDevices()

  useEffect(() => {
    fetchDevices({
      page: devices.meta?.currentPage || 1,
      pageSize: devices.meta?.itemsPerPage || 10,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <List className={list}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h1" color="primary">
            Devices List
          </Typography>
          <Button startIcon={<AddCircle />} onClick={() => push(`${toHardwarePage}${toAddItem}`)}>
            Add new device
          </Button>
        </Box>
        <Box mt={2}>
          <Loader isLoading={devices.isLoading} objects={devices.data}>
            <HardwareTable />
          </Loader>
        </Box>
      </List>
    </>
  )
}
