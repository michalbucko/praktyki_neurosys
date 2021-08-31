import { Device } from 'features/HardwarePage/types'
import React, { useState, ChangeEvent } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { nanoid } from '@reduxjs/toolkit'
import { TextField, Button, Typography, Box } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import AddCircle from '@material-ui/icons/AddCircle'
import { DatePicker } from '@material-ui/pickers'
import { dateFormat } from 'utils/dateFormat'
import { ArrowBack, Save } from '@material-ui/icons'
import { toList } from '../routes'
import { useDispatchDevices, useSelectHardware } from '../hardwareSlice'

export type FormValues = Omit<Device, 'id'>

type ParamProps = {
  id?: string
}

export const HardwareForm = (): JSX.Element => {
  const params = useParams<ParamProps>()
  const { devices } = useSelectHardware()
  const [deviceToEdit] = devices.filter((device: Device) => device.id === params.id)
  const { push } = useHistory()
  const { addDevice, editDevice } = useDispatchDevices()
  const initialState: FormValues = {
    type: '',
    brand: '',
    model: '',
    serialNumber: '',
    location: '',
    startDate: null,
    endDate: null,
  }

  const getInitialState = () => {
    if (deviceToEdit) {
      const { id, ...restProps } = deviceToEdit
      return restProps
    }
    return initialState
  }

  const [formValues, setFormValues] = useState<FormValues>(getInitialState)

  const handleChange = (name: keyof FormValues, value: string | Date | null): void => {
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
    <Box maxWidth={800} mx="auto">
      <Box my={1}>
        <Button startIcon={<ArrowBack />} onClick={() => push(`${toHardwarePage}${toList}`)}>
          Go back
        </Button>
      </Box>

      <Typography variant="h2" color="primary">
        {deviceToEdit ? 'Edit' : 'Add new'} device:
      </Typography>

      <Box display="grid" gridRowGap={16} mt={2}>
        <TextField
          fullWidth
          color="primary"
          variant="outlined"
          value={formValues.type}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('type', e.target.value)}
          label="Type..."
        />
        <TextField
          fullWidth
          color="primary"
          variant="outlined"
          value={formValues.brand}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('brand', e.target.value)}
          label="Brand..."
        />
        <TextField
          fullWidth
          color="primary"
          variant="outlined"
          value={formValues.model}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('model', e.target.value)}
          label="Model..."
        />
        <TextField
          fullWidth
          color="primary"
          variant="outlined"
          value={formValues.serialNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('serialNumber', e.target.value)}
          label="Serial number..."
        />
        <TextField
          fullWidth
          color="primary"
          variant="outlined"
          value={formValues.location}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('location', e.target.value)}
          label="Location..."
        />
        <DatePicker
          fullWidth
          inputVariant="outlined"
          value={formValues.startDate}
          onChange={(date) => handleChange('startDate', date)}
          format={dateFormat}
          label="Start Date"
        />
        <DatePicker
          fullWidth
          inputVariant="outlined"
          value={formValues.endDate}
          onChange={(date) => handleChange('endDate', date)}
          format={dateFormat}
          label="End Date"
        />
      </Box>

      <Box display="grid" gridAutoFlow="column" gridColumnGap={10} justifyContent="end" mt={2}>
        <Button
          startIcon={<ReplayIcon />}
          variant="contained"
          color="secondary"
          onClick={() => setFormValues(initialState)}
        >
          Reset
        </Button>
        <Button
          startIcon={deviceToEdit ? <Save /> : <AddCircle />}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {deviceToEdit ? 'Save' : 'Add'}
        </Button>
      </Box>
    </Box>
  )
}
