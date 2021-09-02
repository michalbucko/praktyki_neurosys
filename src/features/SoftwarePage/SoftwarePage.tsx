import { Redirect, Switch, useRouteMatch } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { PrivateRoute } from 'routes/PrivateRoute'
import { AddEditSoftware } from './components/AddEditSoftware/AddEditSoftware'
import { toAddItem, toEditItem, toList } from './routes'
import { SoftwareList } from './components/SoftwareList/SoftwareList'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
}))

export const SoftwarePage = () => {
  const { container } = useStyles()
  const { path } = useRouteMatch()

  return (
    <Container className={container} maxWidth="md">
      <Switch>
        <PrivateRoute path={`${path}${toEditItem}/:id`} component={AddEditSoftware} />
        <PrivateRoute path={`${path}${toAddItem}`} component={AddEditSoftware} />
        <PrivateRoute path={`${path}${toList}`} component={SoftwareList} />
        <PrivateRoute path={`${path}`} exact component={() => <Redirect to={`${path}${toList}`} />} />
      </Switch>
    </Container>
  )
}
