import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect, Switch, useRouteMatch } from 'react-router-dom'
import { PrivateRoute } from 'routes/PrivateRoute'
import { useDispatchNotification } from 'shared/Notification/notificationsSlice'
import { HardwareFormContainer } from './HardwareFormContainer/HardwareFormContainer'
import { HardwareListContainer } from './HardwareListContainer/HardwareListContainer'
import { toAddItem, toEditItem, toList } from './routes'
import { Notification } from '../../shared/Notification/Notification/Notification'

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
  const { clearMessages } = useDispatchNotification()

  useEffect(() => {
    return () => {
      clearMessages()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className={container} maxWidth="md">
      <Notification />
      <Switch>
        <PrivateRoute path={`${path}${toEditItem}/:id`} component={HardwareFormContainer} />
        <PrivateRoute path={`${path}${toList}`} component={HardwareListContainer} />
        <PrivateRoute path={`${path}${toAddItem}`} component={HardwareFormContainer} />
        <PrivateRoute path={`${path}`} exact component={() => <Redirect to={`${path}${toList}`} />} />
      </Switch>
    </Container>
  )
}
