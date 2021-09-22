/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { User } from 'features/User/types'
import { useHistory, useParams } from 'react-router-dom'
import { toUsersPage } from 'routes/routes'
import { Box, Button, MenuItem, TextField, Typography } from '@material-ui/core'
import { Add, ArrowBack, RotateLeft, Save } from '@material-ui/icons'
import { DatePicker } from '@material-ui/pickers'
import { dateFormat } from 'utils/dateFormat'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { getTextFieldParams } from 'utils/getTextFieldParams'
import { format } from 'date-fns'
import Loader from 'components/Loader/Loader'
import { toList } from '../../routes'
import { useDisptachUsers, useSelectUsers } from '../../usersSlice'

export type FormValues = Omit<User, 'id'>

export const UserAddForm = () => {
  const params = useParams<{ id: string }>()
  const isEditForm = !!params.id
  const { userToEdit, location } = useSelectUsers()
  const { push } = useHistory()
  const { fetchUserToEdit, editUser, addUser, fetchLocation } = useDisptachUsers()

  useEffect(() => {
    if (isEditForm) {
      fetchUserToEdit(params.id)
    }

    fetchLocation()
  }, [])

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    role: '',
    location: 0,
    position: '',
    email: '',
    password: '',
    beginDate: new Date(2021, 0, 1),
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

  const handleDate = (input: Date | string) => (input instanceof Date ? format(input, dateFormat) : input)

  const handleDateOptional = (input: Date | string | undefined | null) => (input ? handleDate(input) : undefined)

  const { handleSubmit, getFieldMeta, getFieldProps, setFieldValue, isSubmitting, values, resetForm } = useFormik({
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
        })
      } else {
        addUser({
          postUser: user,
          onSuccess: () => {
            resetForm()
            push(`${toUsersPage}${toList}`)
          },
        })
      }
    },
  })

  return (
    <Loader isLoading={userToEdit.isLoading || location.isLoading} objects={[userToEdit.data]}>
      <Box maxWidth={800} mx="auto">
        <Box my={1}>
          <Button startIcon={<ArrowBack />} onClick={() => push(`${toUsersPage}${toList}`)}>
            Go back
          </Button>
        </Box>

        <Typography variant="h2" color="primary">
          {isEditForm ? 'Edit user' : 'Add new user'}
        </Typography>

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
              {location.data.map((item) => {
                return (
                  <MenuItem key={`location-${item.id}`} value={item.id}>
                    {item.name}
                  </MenuItem>
                )
              })}
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
      </Box>
    </Loader>
  )
}
