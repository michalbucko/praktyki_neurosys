import { Redirect, Route, Switch, useRouteMatch } from 'react-router'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AddEditSoftware } from './components/AddEditSoftware/AddEditSoftware'
import { toAddItem, toEditItem, toList } from './routes'
import { SoftwareList } from './components/SoftwareList/SoftwareList'

const useStyles = makeStyles({
  gridContainer: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
})

export const SoftwarePage = () => {
  const { gridContainer } = useStyles()
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}${toEditItem}/:id`}>
        <Grid container spacing={1}>
          <Grid item xs={3} spacing={1} />
          <Grid item xs={6} spacing={4} alignItems="center">
            <Container className={gridContainer} maxWidth="xl">
              <AddEditSoftware />
            </Container>
          </Grid>
          <Grid item xs={3} spacing={1} />
        </Grid>
      </Route>
      <Route path={`${path}${toAddItem}`}>
        <Grid container spacing={1}>
          <Grid item xs={3} spacing={1} />
          <Grid item xs={6} spacing={4} alignItems="center">
            <Container className={gridContainer} maxWidth="xl">
              <AddEditSoftware />
            </Container>
          </Grid>
          <Grid item xs={3} spacing={1} />
        </Grid>
      </Route>
      <Route path={`${path}${toList}`}>
        <Grid container spacing={1}>
          <Grid item xs={2} spacing={1} />
          <Grid item xs={8} spacing={4} alignItems="center">
            <Container className={gridContainer} maxWidth="xl">
              <SoftwareList />
            </Container>
          </Grid>
          <Grid item xs={2} spacing={1} />
        </Grid>
      </Route>
      <Route path={`${path}`} exact>
        <Redirect to={`${path}${toList}`} />
      </Route>
    </Switch>
  )
}
