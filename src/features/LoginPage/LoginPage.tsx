import { Container, makeStyles } from '@material-ui/core'
import { Loader } from 'utils/Loader'
import { LoginForm } from './components/LoginForm'
import { useSelectLogin } from './LoginSlice'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
}))

export const LoginPage = () => {
  const { container } = useStyles()
  const { isLoading } = useSelectLogin()
  // TODO SNACKBAR
  return (
    <Loader isLoading={isLoading}>
      <Container className={container} maxWidth="md">
        <LoginForm />
      </Container>
    </Loader>
  )
}
