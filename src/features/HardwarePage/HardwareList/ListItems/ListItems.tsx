import { Button, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import { Device } from 'features/HardwarePage/types'
import { useDispatchDevices } from 'features/HardwarePage/hardwareSlice'
import { toEditItem } from 'features/HardwarePage/routes'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { RootState } from 'store/store'

const useStyles = makeStyles((theme) => ({
  item: {
    justifyContent: 'space-between',
    gap: 15,
    padding: '12px 5px',
  },
  itemText: {
    margin: 0,
  },
  button: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
    },
  },
}))

export const ListItems = () => {
  const devices = useSelector((state: RootState) => state.hardwareState.devices)
  const { push } = useHistory()
  const { deleteDevice } = useDispatchDevices()
  const { item, itemText, button } = useStyles()

  return (
    <>
      {devices.map(
        (device: Device, index: number): JSX.Element => (
          <ListItem divider={index < devices.length - 1} className={item} key={device.id}>
            <ListItemText className={itemText} primary={device.type} secondary={device.brand} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<CreateIcon />}
              onClick={() => push(`${toHardwarePage}${toEditItem}/${device.id}`)}
            >
              Edit
            </Button>
            <Button
              className={button}
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => deleteDevice(device.id)}
            >
              Delete
            </Button>
          </ListItem>
        )
      )}
    </>
  )
}
