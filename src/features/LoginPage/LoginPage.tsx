import { Container, makeStyles } from '@material-ui/core'
import { LoginForm } from './components/LoginForm'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
}))

export const LoginPage = () => {
  const { container } = useStyles()

  return (
    <Container className={container} maxWidth="md">
      <LoginForm />
    </Container>
  )
}
