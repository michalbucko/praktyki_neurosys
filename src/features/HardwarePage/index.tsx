import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { HardwareForm } from './HardwareForm'
import { HarwareList } from './HardwareList'
import { toAddItem, toEditItem, toList } from './routes'
import { Wrapper } from './styled'

export const HardwarePage = (): JSX.Element => {
  const { path } = useRouteMatch()

  return (
    <>
      <Switch>
        <Route path={`${path}${toEditItem}/:id`}>
          <Wrapper>
            <HardwareForm />
          </Wrapper>
        </Route>
        <Route path={`${path}${toList}`}>
          <Wrapper>
            <HarwareList />
          </Wrapper>
        </Route>
        <Route path={`${path}${toAddItem}`}>
          <Wrapper>
            <HardwareForm />
          </Wrapper>
        </Route>
        <Route path={`${path}`} exact>
          <Redirect to={`${path}${toList}`} />
        </Route>
      </Switch>
    </>
  )
}
