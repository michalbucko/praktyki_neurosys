import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button'
import { useDispatchSoftware, useSelectSoftware } from 'features/SoftwarePage/SoftwareSlice'
import { toList } from 'features/SoftwarePage/routes'
import { toSoftwarePage } from 'routes/routes'
import { useParams } from 'react-router'
import { nanoid } from '@reduxjs/toolkit'
import { Box, TextField, Typography } from '@material-ui/core'
import { Add, ArrowBack, RotateLeft, Save } from '@material-ui/icons'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { dateFormat } from 'utils/dateFormat'
import { Software } from '../../Software'

type FormValues = Omit<Software, 'id'>

type SoftwareParams = {
  id?: string
}

export const AddEditSoftware = () => {
  const initialValues: FormValues = {
    company: '',
    name: '',
    category: '',
    expDate: null,
    amount: '',
  }

  const { softwares } = useSelectSoftware()
  const { addSoftware, editSoftware } = useDispatchSoftware()
  const { push } = useHistory()
  const params = useParams<SoftwareParams>()

  const [softwareToEdit] = softwares.filter((software) => software.id === params.id)

  const getInitialValues = () => {
    if (softwareToEdit) {
      const { id, ...rest } = softwareToEdit
      return rest
    }
    return initialValues
  }

  const [values, setValues] = useState<FormValues>(getInitialValues)

  const onChange = (name: keyof FormValues, value: string | Date | null) => {
    setValues((state) => ({
      ...state,
      [name]: value,
    }))
  }

  const resetForm = () => setValues(initialValues)

  const onSubmit = () => {
    if (softwareToEdit) {
      const { id } = softwareToEdit
      editSoftware({
        id,
        ...values,
      })
    } else {
      addSoftware({
        id: nanoid(),
        ...values,
      })
    }
    resetForm()
  }

  return (
    <Box maxWidth={800} mx="auto">
      <Box my={1}>
        <Button startIcon={<ArrowBack />} onClick={() => push(`${toSoftwarePage}${toList}`)}>
          Go back
        </Button>
      </Box>

      <Typography variant="h5" color="primary">
        {softwareToEdit ? 'Edit Licence' : 'Add new Licence'}
      </Typography>

      <Box display="grid" gridRowGap={16} mt={2}>
        <TextField
          value={values.company}
          variant="outlined"
          fullWidth
          onChange={(event) => onChange('company', event.target.value)}
          placeholder="Enter company"
          label="Company name"
        />
        <TextField
          value={values.name}
          variant="outlined"
          fullWidth
          onChange={(event) => onChange('name', event.target.value)}
          placeholder="Enter licence name"
          label="Licence name"
        />
        <TextField
          value={values.category}
          variant="outlined"
          fullWidth
          onChange={(event) => onChange('category', event.target.value)}
          placeholder="Enter category"
          label="Category"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={values.expDate}
            onChange={(date) => onChange('expDate', date)}
            fullWidth
            format={dateFormat}
            inputVariant="outlined"
            placeholder="Enter expire date"
            label="Expire date"
          />
        </MuiPickersUtilsProvider>
        <TextField
          value={values.amount === undefined ? '' : values.amount}
          variant="outlined"
          fullWidth
          type="number"
          onChange={(event) => onChange('amount', event.target.value)}
          placeholder="Enter number"
          label="Amount of devices"
        />
      </Box>

      <Box display="grid" gridAutoFlow="column" gridColumnGap={10} justifyContent="end" mt={2}>
        <Button color="secondary" variant="contained" startIcon={<RotateLeft />} onClick={resetForm} disableElevation>
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={softwareToEdit ? <Save /> : <Add />}
          onClick={onSubmit}
          disableElevation
        >
          {softwareToEdit ? 'Save' : 'Add'}
        </Button>
      </Box>
    </Box>
  )
}
