import { Box, Button, TextField, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { LockOpen } from '@material-ui/icons'
import { useDispatchLogin } from '../LoginSlice'
import { AuthType } from '../AuthType'
import { getTextFieldParams } from './getTextFieldParams'

export const LoginForm = () => {
  const { logIn } = useDispatchLogin()

  const initialValues: AuthType = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email required'),
    password: Yup.string().required('Password required'),
  })

  const { handleSubmit, getFieldMeta, getFieldProps } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      logIn(values)
    },
  })

  return (
    <Box maxWidth={900} mx="auto">
      <form onSubmit={handleSubmit}>
        <Box my={1}>
          <Typography variant="h5" color="primary">
            Sign In
          </Typography>
        </Box>
        <Box display="grid" gridRowGap={16} mt={2}>
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            placeholder="E-mail adress"
            {...getTextFieldParams('email', getFieldMeta, getFieldProps)}
          />
          <TextField
            variant="outlined"
            type="password"
            label="Password"
            placeholder="Password"
            {...getTextFieldParams('password', getFieldMeta, getFieldProps)}
          />
        </Box>
        <Box display="grid" gridAutoFlow="column" gridColumnGap={10} justifyContent="start" mt={2}>
          <Button variant="contained" type="submit" startIcon={<LockOpen />} disableElevation>
            Log in
          </Button>
        </Box>
      </form>
    </Box>
  )
}
