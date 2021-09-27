/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { toUsersPage } from 'routes/routes'
import { Box, Button, MenuItem, TextField } from '@material-ui/core'
import { Add, RotateLeft, Save } from '@material-ui/icons'
import { DatePicker } from '@material-ui/pickers'
import { dateFormat } from 'utils/dateFormat'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { getTextFieldParams } from 'utils/getTextFieldParams'
import { handleDate, handleDateOptional } from 'features/User/handleDate'
import { useDisptachUsers, useSelectUsers } from 'features/User/usersSlice'
import { useDispatchLocation, useSelectLocation } from 'shared/location/locationSlice'
import { useHistory, useParams } from 'react-router-dom'
import { startOfDay } from 'date-fns'
import { toList } from '../../routes'
import { FormValues } from './UserForm'

export const UserFormFields = () => {
  const params = useParams<{ id?: string }>()
  const isEditForm = !!params.id
  const { fetchUserToEdit, editUser, addUser } = useDisptachUsers()
  const { fetchLocation } = useDispatchLocation()
  const { userToEdit } = useSelectUsers()
  const { locations } = useSelectLocation()
  const { push } = useHistory()

  useEffect(() => {
    if (isEditForm && params.id) {
      fetchUserToEdit(params.id)
    }

    fetchLocation()
  }, [])

  const beginDate = startOfDay(new Date())
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    role: '',
    location: 0,
    position: '',
    email: '',
    password: '',
    beginDate,
    endDate: null,
  }

  const getInitialValues = () => {
    if (userToEdit.data && isEditForm) {
      const userToEditFormValues = {
        firstName: userToEdit.data.firstName,
        lastName: userToEdit.data.lastName,
        location: userToEdit.data.location.id,
        position: userToEdit.data.position,
        beginDate: userToEdit.data.beginDate,
        endDate: userToEdit.data.endDate,
      }
      return { ...initialValues, ...userToEditFormValues }
    }
    return initialValues
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().when([], {
      is: () => isEditForm,
      then: Yup.string().notRequired(),
      otherwise: Yup.string().required('Email required'),
    }),
    password: Yup.string().when([], {
      is: () => isEditForm,
      then: Yup.string().notRequired(),
      otherwise: Yup.string().required('Password required'),
    }),
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    position: Yup.string().required('Position required'),
    location: Yup.number().required('Location required'),
    beginDate: Yup.date().required('Begin date required'),
  })

  const { handleSubmit, getFieldMeta, getFieldProps, setFieldValue, isSubmitting, values, resetForm, setSubmitting } =
    useFormik({
      initialValues: getInitialValues(),
      validationSchema,
      enableReinitialize: true,
      onSubmit: () => {
        const user = {
          ...values,
          beginDate: handleDate(values.beginDate),
          endDate: handleDateOptional(values.endDate),
        }

        if (userToEdit.data && isEditForm) {
          const { id } = userToEdit.data
          editUser({
            patchUser: {
              id,
              user,
            },
            onSuccess: () => {
              resetForm()
              push(`${toUsersPage}${toList}`)
            },
            onFail: () => setSubmitting(false),
          })
        } else {
          addUser({
            postUser: user,
            onSuccess: () => {
              resetForm()
              push(`${toUsersPage}${toList}`)
            },
            onFail: () => setSubmitting(false),
          })
        }
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <Box display="grid" gridRowGap={16} mt={2}>
        <TextField
          variant="outlined"
          label="First name"
          type="firstName"
          {...getTextFieldParams('firstName', getFieldMeta, getFieldProps)}
        />
        <TextField
          variant="outlined"
          label="Last name"
          type="lastName"
          {...getTextFieldParams('lastName', getFieldMeta, getFieldProps)}
        />
        <TextField
          variant="outlined"
          label="Role"
          disabled
          type="role"
          {...getTextFieldParams('role', getFieldMeta, getFieldProps)}
        />
        <TextField
          variant="outlined"
          select
          label="Location"
          type="location"
          {...getTextFieldParams('location', getFieldMeta, getFieldProps)}
        >
          <MenuItem value={0}>No selected</MenuItem>
          {locations.data.map((item) => (
            <MenuItem key={`location-${item.id}`} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          label="Position"
          type="position"
          {...getTextFieldParams('position', getFieldMeta, getFieldProps)}
        />
        <TextField
          disabled={isEditForm}
          variant="outlined"
          label="E-mail"
          type="email"
          {...getTextFieldParams('email', getFieldMeta, getFieldProps)}
        />
        <TextField
          disabled={isEditForm}
          variant="outlined"
          label="Password"
          type="password"
          {...getTextFieldParams('password', getFieldMeta, getFieldProps)}
        />
        <DatePicker
          inputVariant="outlined"
          label="Begin Date"
          format={dateFormat}
          type="beginDate"
          {...getTextFieldParams('beginDate', getFieldMeta, getFieldProps)}
          onChange={(date) => setFieldValue('beginDate', date)}
          value={values.beginDate}
        />
        <DatePicker
          inputVariant="outlined"
          label="End Date"
          format={dateFormat}
          type="endDate"
          {...getTextFieldParams('endDate', getFieldMeta, getFieldProps)}
          onChange={(date) => setFieldValue('endDate', date)}
          value={values.endDate}
        />
      </Box>

      <Box display="grid" gridAutoFlow="column" gridColumnGap={10} justifyContent="end" mt={2}>
        <Button
          disabled={isSubmitting}
          color="secondary"
          variant="contained"
          startIcon={<RotateLeft />}
          onClick={() => resetForm()}
          disableElevation
          type="button"
        >
          Reset
        </Button>
        <Button
          disabled={isSubmitting}
          variant="contained"
          color="primary"
          startIcon={isEditForm ? <Save /> : <Add />}
          type="submit"
          disableElevation
        >
          {isEditForm ? 'Save' : 'Add'}
        </Button>
      </Box>
    </form>
  )
}
