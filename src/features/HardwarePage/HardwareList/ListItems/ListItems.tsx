import { Box, Button, Divider, ListItem, ListItemText } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import { Device } from 'features/HardwarePage/types'
import { useDispatchDevices } from 'features/HardwarePage/hardwareSlice'
import { toEditItem } from 'features/HardwarePage/routes'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { RootState } from 'store/store'
import { Fragment } from 'react'

export const ListItems = () => {
  const devices = useSelector((state: RootState) => state.hardwareState.devices)
  const { push } = useHistory()
  const { deleteDevice } = useDispatchDevices()

  return (
    <>
      {devices.map(
        (device: Device, mapIndex: number): JSX.Element => (
          <Fragment key={device.id}>
            {mapIndex > 0 && <Divider />}
            <ListItem disableGutters>
              <ListItemText primary={device.type} secondary={device.brand} />
              <Box display="grid" gridAutoFlow="column" gridColumnGap={10}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CreateIcon />}
                  disableElevation
                  onClick={() => push(`${toHardwarePage}${toEditItem}/${device.id}`)}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  disableElevation
                  onClick={() => deleteDevice(device.id)}
                >
                  Remove
                </Button>
              </Box>
            </ListItem>
          </Fragment>
        )
      )}
    </>
  )
}
