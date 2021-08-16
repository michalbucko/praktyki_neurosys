import React, { useState } from 'react'
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import { HardwareForm } from './HardwareForm'
import { HarwareList } from './HardwareList'
import { toAddItem, toList } from './routes'
import { Wrapper } from './styled'

export type Device = {
  id: number
  type: string
  brand: string
  model: string
  serialNumber: string
  location: string
}

export const HarwarePage = (): JSX.Element => {
  const [devices, setDevices] = useState<Device[]>([])
  const [lastIndex, setLastIndex] = useState(0)
  const [deviceToEdit, setDeviceToEdit] = useState<Device | null>(null)
  const { path } = useRouteMatch()
  const { push } = useHistory()

  const addDevice = (device: Omit<Device, 'id'>): void => {
    setDevices((state): Device[] => [
      ...state,
      {
        id: lastIndex + 1,
        ...device,
      },
    ])
    setLastIndex((state): number => state + 1)
    push(`${path}${toList}`)
  }

  const editDevice = (device: Omit<Device, 'id'>, id: number) => {
    setDevices((state): Device[] => state.map((item) => (item.id === id ? { id, ...device } : { ...item })))
    setDeviceToEdit(null)
    push(`${path}${toList}`)
  }

  const deleteDevice = (deviceId: number): void => {
    setDevices((state): Device[] => state.filter((device) => deviceId !== device.id))
  }

  const onEditButtonClick = (deviceId: number): void => {
    const [filtredDevice] = devices.filter((device) => device.id === deviceId)
    setDeviceToEdit(filtredDevice)
    push(`${path}${toAddItem}`)
  }

  return (
    <>
      <Switch>
        <Route path={`${path}${toList}`}>
          <Wrapper>
            <HarwareList devices={devices} deleteDevice={deleteDevice} onEditButtonClick={onEditButtonClick} />
          </Wrapper>
        </Route>
        <Route path={`${path}${toAddItem}`}>
          <Wrapper>
            <HardwareForm addDevice={addDevice} editDevice={editDevice} deviceToEdit={deviceToEdit} />
          </Wrapper>
        </Route>
        <Route path={`${path}`} exact>
          <Redirect to={`${path}${toList}`} />
        </Route>
      </Switch>
    </>
  )
}
