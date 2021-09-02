import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect, Switch, useRouteMatch } from 'react-router-dom'
import { PrivateRoute } from 'routes/PrivateRoute'
import { HardwareForm } from './HardwareForm/HardwareForm'
import { HardwareList } from './HardwareList/HardwareList'
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
        <PrivateRoute path={`${path}${toEditItem}/:id`} component={HardwareForm} />
        <PrivateRoute path={`${path}${toList}`} component={HardwareList} />
        <PrivateRoute path={`${path}${toAddItem}`} component={HardwareForm} />
        <PrivateRoute path={`${path}`} exact component={() => <Redirect to={`${path}${toList}`} />} />
      </Switch>
    </Container>
  )
}
