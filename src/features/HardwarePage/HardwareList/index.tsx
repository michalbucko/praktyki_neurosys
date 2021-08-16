import React from 'react'
import { Device } from 'features/HardwarePage/index'
import Button from 'components/Button/Button'
import { List } from 'components/List'
import { ListItem } from 'components/List/ListItem'
import { Link } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { toAddItem } from '../routes'

type Props = {
  devices: Device[]
  deleteDevice: (deviceId: number) => void
  onEditButtonClick: (deviceId: number) => void
}

export const HarwareList = ({ devices, deleteDevice, onEditButtonClick }: Props): JSX.Element => {
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
                <Button onClick={() => onEditButtonClick(device.id)}>Edit</Button>
              </>
            }
          />
        ))}
        <Link to={`${toHardwarePage}${toAddItem}`}>Add new device</Link>
      </>
    </List>
  )
}
