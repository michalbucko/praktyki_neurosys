import { Device } from 'features/HardwarePage/device'
import React, { useState, ChangeEvent } from 'react'
import { Input } from 'components/Input/Input'
import Button, { ButtonColor } from 'components/Button/Button'
import { Link, useHistory, useParams } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { nanoid } from '@reduxjs/toolkit'
import { toList } from '../routes'
import { useDispatchDevices, useSelectHardware } from '../hardwareSlice'

export type FormValues = Omit<Device, 'id'>

type ParamProps = {
  id?: string
}

export const HardwareForm = (): JSX.Element => {
  const params = useParams<ParamProps>()
  const { devices } = useSelectHardware()
  const [deviceToEdit] = devices.filter((device) => device.id === params.id)
  const { push } = useHistory()
  const { addDevice, editDevice } = useDispatchDevices()
  const initialState: FormValues = {
    type: '',
    brand: '',
    model: '',
    serialNumber: '',
    location: '',
  }

  const getInitialState = () => {
    if (deviceToEdit) {
      const { id, ...restProps } = deviceToEdit
      return restProps
    }
    return initialState
  }

  const [formValues, setFormValues] = useState<FormValues>(getInitialState)

  const handleChange = (name: keyof FormValues, value: string): void => {
    setFormValues((state) => ({
      ...state,
      [name]: value,
    }))
  }

  const handleSubmit = (): void => {
    if (deviceToEdit) {
      const { id } = deviceToEdit
      editDevice({
        id,
        ...formValues,
      })
    } else {
      addDevice({
        id: nanoid(),
        ...formValues,
      })
    }
    setFormValues(initialState)
    push(`${toHardwarePage}${toList}`)
  }

  return (
    <div className="item">
      <Link to={`${toHardwarePage}${toList}`}>Go back</Link>
      <h2>{deviceToEdit ? 'Edit' : 'Add new'} device:</h2>
      <Input
        value={formValues.type}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('type', e.target.value)}
        label="Type..."
      />
      <Input
        value={formValues.brand}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('brand', e.target.value)}
        label="Brand..."
      />
      <Input
        value={formValues.model}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('model', e.target.value)}
        label="Model..."
      />
      <Input
        value={formValues.serialNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('serialNumber', e.target.value)}
        label="Serial number..."
      />
      <Input
        value={formValues.location}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('location', e.target.value)}
        label="Location..."
      />
      <p>
        <Button onClick={handleSubmit}>{deviceToEdit ? 'Edit' : 'Add'}</Button>
        <Button color={ButtonColor.secondary} onClick={() => setFormValues(initialState)}>
          Reset
        </Button>
      </p>
    </div>
  )
}
