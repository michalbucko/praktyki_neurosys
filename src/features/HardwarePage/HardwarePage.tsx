import React from 'react'
import { ThemeProvider, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { HardwareForm } from './HardwareForm/HardwareForm'
import { HarwareList } from './HardwareList/HardwareList'
import { toAddItem, toEditItem, toList } from './routes'
import { theme } from './theme/theme'

const useStyles = makeStyles({
  wrapper: {
    background: '#ffff',
    padding: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
})

export const HardwarePage = (): JSX.Element => {
  const { path } = useRouteMatch()
  const { wrapper } = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <Container className={wrapper} maxWidth="md">
        <Switch>
          <Route path={`${path}${toEditItem}/:id`}>
            <HardwareForm />
          </Route>
          <Route path={`${path}${toList}`}>
            <HarwareList />
          </Route>
          <Route path={`${path}${toAddItem}`}>
            <HardwareForm />
          </Route>
          <Route path={`${path}`} exact>
            <Redirect to={`${path}${toList}`} />
          </Route>
        </Switch>
      </Container>
    </ThemeProvider>
  )
}
