import React from 'react'
import Button from 'components/Button/Button'
import { List } from 'components/List'
import { ListItem } from 'components/List/ListItem'
import { Link, useHistory } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { toAddItem, toEditItem } from '../routes'
import { useDispatchDevices, useSelectHardware } from '../hardwareSlice'

export const HarwareList = (): JSX.Element => {
  const { devices } = useSelectHardware()
  const { push } = useHistory()
  const { deleteDevice } = useDispatchDevices()

  return (
    <List header="Device List" divider>
      <>
        {devices.map((device) => (
          <ListItem
            key={device.id}
            primaryText={device.type}
            secondaryText={device.brand}
            Buttons={
              <>
                <Button onClick={() => deleteDevice(device.id)}>Delete device</Button>
                <Button onClick={() => push(`${toHardwarePage}${toEditItem}/${device.id}`)}>Edit</Button>
              </>
            }
          />
        ))}
        <Link to={`${toHardwarePage}${toAddItem}`}>Add new device</Link>
      </>
    </List>
  )
}
