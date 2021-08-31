import { Redirect, Route, Switch, useRouteMatch } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
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
        <Route path={`${path}${toEditItem}/:id`} component={AddEditSoftware} />
        <Route path={`${path}${toAddItem}`} component={AddEditSoftware} />
        <Route path={`${path}${toList}`} component={SoftwareList} />

        <Route path={`${path}`} exact>
          <Redirect to={`${path}${toList}`} />
        </Route>
      </Switch>
    </Container>
  )
}
