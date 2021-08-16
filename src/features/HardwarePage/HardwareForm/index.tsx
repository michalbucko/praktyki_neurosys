import { Device } from 'features/HardwarePage/index'
import React, { useState, ChangeEvent } from 'react'
import { Input } from 'components/Input/Input'
import Button, { ButtonColor } from 'components/Button/Button'
import { Link } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { toList } from '../routes'

export type FormValues = Omit<Device, 'id'>

type Props = {
  addDevice: (device: Omit<Device, 'id'>) => void
  editDevice: (device: Omit<Device, 'id'>, id: number) => void
  deviceToEdit: Device | null
}

export const HardwareForm = ({ addDevice, deviceToEdit, editDevice }: Props): JSX.Element => {
  const initialState: FormValues = {
    type: '',
    brand: '',
    model: '',
    serialNumber: '',
    location: '',
  }

  const getInitialState = () => {
    if (deviceToEdit) {
      const { id, ...editFormValues } = deviceToEdit
      return editFormValues
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

  const handleReset = (): void => setFormValues(initialState)

  const handleSubmit = (): void => {
    if (deviceToEdit) {
      const { id } = deviceToEdit
      editDevice(formValues, id)
    } else {
      addDevice(formValues)
    }
    handleReset()
  }

  return (
    <div className="item">
      <Link to={`${toHardwarePage}${toList}`}>Go back</Link>
      <h2>Add new devide:</h2>
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
        <Button color={ButtonColor.secondary} onClick={handleReset}>
          Reset
        </Button>
      </p>
    </div>
  )
}
