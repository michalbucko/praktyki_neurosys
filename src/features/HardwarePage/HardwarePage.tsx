import React, { useEffect } from 'react'
import { Redirect, Switch, useRouteMatch } from 'react-router-dom'
import { PrivateRoute } from 'routes/PrivateRoute'
import { useDispatchNotification } from 'shared/Notification/notificationsSlice'
import { StyledContainer } from 'components/StyledContainer/StyledContainer'
import { HardwareFormContainer } from './HardwareFormContainer/HardwareFormContainer'
import { HardwareListContainer } from './HardwareTableContainer/HardwareTableContainer'
import { toAddItem, toEditItem, toList } from './routes'
import { Notification } from '../../shared/Notification/Notification/Notification'

export const HardwarePage = (): JSX.Element => {
  const { path } = useRouteMatch()
  const { clearMessages } = useDispatchNotification()

  useEffect(() => {
    return () => {
      clearMessages()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledContainer>
      <Notification />
      <Switch>
        <PrivateRoute path={`${path}${toEditItem}/:id`} component={HardwareFormContainer} />
        <PrivateRoute path={`${path}${toList}`} component={HardwareListContainer} />
        <PrivateRoute path={`${path}${toAddItem}`} component={HardwareFormContainer} />
        <PrivateRoute path={`${path}`} exact component={() => <Redirect to={`${path}${toList}`} />} />
      </Switch>
    </StyledContainer>
  )
}
