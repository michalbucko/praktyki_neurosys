import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { HardwareForm } from './HardwareForm/HardwareForm'
import { HarwareList } from './HardwareList/HardwareList'
import { toAddItem, toEditItem, toList } from './routes'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
}))

export const HardwarePage = (): JSX.Element => {
  const { path } = useRouteMatch()
  const { container } = useStyles()

  return (
    <Container className={container} maxWidth="md">
      <Switch>
        <Route path={`${path}${toEditItem}/:id`} component={HardwareForm} />
        <Route path={`${path}${toList}`} component={HarwareList} />
        <Route path={`${path}${toAddItem}`} component={HardwareForm} />

        <Route path={`${path}`} exact>
          <Redirect to={`${path}${toList}`} />
        </Route>
      </Switch>
    </Container>
  )
}
