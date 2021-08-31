import { useState } from 'react'
import { User } from 'features/User/User'
import { useHistory, useParams } from 'react-router-dom'
import { toUsersPage } from 'routes/routes'
import { nanoid } from '@reduxjs/toolkit'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { Add, ArrowBack, RotateLeft, Save } from '@material-ui/icons'
import { DatePicker } from '@material-ui/pickers'
import { dateFormat } from 'utils/dateFormat'
import { toList } from '../../routes'
import { useDisptachUsers, useSelectUsers } from '../../usersSlice'

export type FormValues = Omit<User, 'id'>

type ParamProps = {
  id?: string
}

export const UserAddForm = () => {
  const params = useParams<ParamProps>()
  const { users } = useSelectUsers()
  const [userToEdit] = users.filter((user) => user.id === params.id)
  const { push } = useHistory()
  const { addUser, editUser } = useDisptachUsers()
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    role: '',
    location: '',
    position: '',
    email: '',
    password: '',
    beginDate: null,
    endDate: null,
  }

  const getInitialState = () => {
    if (userToEdit) {
      const { id, ...rest } = userToEdit
      return rest
    }
    return initialValues
  }

  const [values, setValues] = useState<FormValues>(getInitialState)

  const onChange = (name: keyof FormValues, value: string | Date | null) => {
    setValues((state) => ({
      ...state,
      [name]: value,
    }))
  }

  const resetForm = () => setValues(initialValues)

  const onSubmit = (): void => {
    if (userToEdit) {
      const { id } = userToEdit
      editUser({
        id,
        ...values,
      })
    } else {
      addUser({
        id: nanoid(),
        ...values,
      })
    }
    setValues(initialValues)
    push(`${toUsersPage}${toList}`)
  }

  return (
    <Box maxWidth={800} mx="auto">
      <Box my={1}>
        <Button startIcon={<ArrowBack />} onClick={() => push(`${toUsersPage}${toList}`)}>
          Go back
        </Button>
      </Box>

      <Typography variant="h2" color="primary">
        {userToEdit ? 'Edit user' : 'Add new user'}
      </Typography>

      <Box display="grid" gridRowGap={16} mt={2}>
        <TextField
          variant="outlined"
          label="First name"
          value={values.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Last name"
          value={values.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Role"
          value={values.role}
          onChange={(e) => onChange('role', e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Location"
          value={values.location}
          onChange={(e) => onChange('location', e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Position"
          value={values.position}
          onChange={(e) => onChange('position', e.target.value)}
        />
        <TextField
          variant="outlined"
          label="E-mail"
          value={values.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          value={values.password === undefined ? '' : values.password}
          onChange={(e) => onChange('password', e.target.value)}
        />
        <DatePicker
          inputVariant="outlined"
          label="Begin Date"
          value={values.beginDate}
          onChange={(date) => onChange('beginDate', date)}
          format={dateFormat}
        />
        <DatePicker
          inputVariant="outlined"
          label="End Date"
          value={values.endDate}
          onChange={(date) => onChange('endDate', date)}
          format={dateFormat}
        />
      </Box>

      <Box display="grid" gridAutoFlow="column" gridColumnGap={10} justifyContent="end" mt={2}>
        <Button color="secondary" variant="contained" startIcon={<RotateLeft />} onClick={resetForm} disableElevation>
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={userToEdit ? <Save /> : <Add />}
          onClick={onSubmit}
          disableElevation
        >
          {userToEdit ? 'Save' : 'Add'}
        </Button>
      </Box>
    </Box>
  )
}
