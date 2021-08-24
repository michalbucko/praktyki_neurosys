import { Device } from 'features/HardwarePage/types'
import React, { useState, ChangeEvent } from 'react'
import { useHistory, useParams, Link as RouterLink } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { nanoid } from '@reduxjs/toolkit'
import { TextField, Button, Typography, Grid } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ReplayIcon from '@material-ui/icons/Replay'
import EditIcon from '@material-ui/icons/Edit'
import AddCircle from '@material-ui/icons/AddCircle'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { dateFormat } from 'utils/dateFormat'
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
    <Grid container spacing={5}>
      <Grid item>
        <Button component={RouterLink} to={`${toHardwarePage}${toList}`} startIcon={<ArrowBackIosIcon />}>
          Go back
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">{deviceToEdit ? 'Edit' : 'Add new'} device:</Typography>
      </Grid>
      <Grid item xs={12} container spacing={4}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            color="primary"
            variant="outlined"
            value={formValues.type}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('type', e.target.value)}
            label="Type..."
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            color="primary"
            variant="outlined"
            value={formValues.brand}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('brand', e.target.value)}
            label="Brand..."
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            color="primary"
            variant="outlined"
            value={formValues.model}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('model', e.target.value)}
            label="Model..."
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            color="primary"
            variant="outlined"
            value={formValues.serialNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('serialNumber', e.target.value)}
            label="Serial number..."
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            color="primary"
            variant="outlined"
            value={formValues.location}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('location', e.target.value)}
            label="Location..."
          />
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              fullWidth
              inputVariant="outlined"
              value={formValues.startDate}
              onChange={(date) => handleChange('startDate', date)}
              format={dateFormat}
              label="Start Date"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              fullWidth
              inputVariant="outlined"
              value={formValues.endDate}
              onChange={(date) => handleChange('endDate', date)}
              format={dateFormat}
              label="End Date"
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid item xs={12} container spacing={4} justifyContent="flex-end">
        <Grid item>
          <Button
            startIcon={<ReplayIcon />}
            variant="contained"
            color="secondary"
            onClick={() => setFormValues(initialState)}
          >
            Reset
          </Button>
        </Grid>
        <Grid item>
          <Button
            startIcon={deviceToEdit ? <EditIcon /> : <AddCircle />}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {deviceToEdit ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
