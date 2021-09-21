import { Redirect, Switch, useRouteMatch } from 'react-router'
import { PrivateRoute } from 'routes/PrivateRoute'
import { StyledContainer } from 'components/StyledContainer/StyledContainer'
import { AddEditSoftware } from './components/AddEditSoftware/AddEditSoftware'
import { toAddItem, toEditItem, toList } from './routes'
import { SoftwareList } from './components/SoftwareList/SoftwareList'

export const SoftwarePage = () => {
  const { path } = useRouteMatch()

  return (
    <StyledContainer>
      <Switch>
        <PrivateRoute path={`${path}${toEditItem}/:id`} component={AddEditSoftware} />
        <PrivateRoute path={`${path}${toAddItem}`} component={AddEditSoftware} />
        <PrivateRoute path={`${path}${toList}`} component={SoftwareList} />
        <PrivateRoute path={`${path}`} exact component={() => <Redirect to={`${path}${toList}`} />} />
      </Switch>
    </StyledContainer>
  )
}
