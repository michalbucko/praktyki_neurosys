import { Redirect, Switch, useRouteMatch } from 'react-router'
import { PrivateRoute } from 'routes/PrivateRoute'
import { StyledContainer } from 'components/StyledContainer/StyledContainer'
import { useDispatchNotification } from 'shared/Notification/notificationsSlice'
import { useEffect } from 'react'
import { toAddItem, toEditItem, toList } from './routes'
import { SoftwareFormContainer } from './components/SoftwareForm/SoftwareFormContainer'
import { SoftwareTableContainer } from './components/SoftwareTable/SoftwareTableContainer'

export const SoftwarePage = () => {
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
      <Switch>
        <PrivateRoute path={`${path}${toEditItem}/:id`} component={SoftwareFormContainer} />
        <PrivateRoute path={`${path}${toAddItem}`} component={SoftwareFormContainer} />
        <PrivateRoute path={`${path}${toList}`} component={SoftwareTableContainer} />
        <PrivateRoute path={`${path}`} exact component={() => <Redirect to={`${path}${toList}`} />} />
      </Switch>
    </StyledContainer>
  )
}
