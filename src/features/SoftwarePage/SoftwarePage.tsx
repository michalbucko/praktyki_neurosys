import { HorizontalSplit } from 'components/HorizontalSplit/HorizontalSplit'
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router'
import Button, { ButtonVariant } from 'components/Button/Button'
import { AddEditSoftware } from './components/AddEditSoftware'
import { SoftwareList } from './components/SoftwareList'
import { toAddItem, toEditItem, toList } from './routes'

export const SoftwarePage = () => {
  const { path } = useRouteMatch()
  const { push } = useHistory()

  return (
    <>
      <Switch>
        <Route path={`${path}${toEditItem}/:id`}>
          <HorizontalSplit
            leftSide={<AddEditSoftware />}
            rightSide={
              <Button
                variant={ButtonVariant.outlined}
                onClick={() => {
                  push(`${path}${toList}`)
                }}
              >
                List
              </Button>
            }
          />
        </Route>
        <Route path={`${path}${toList}`}>
          <HorizontalSplit
            leftSide={
              <Button
                variant={ButtonVariant.outlined}
                onClick={() => {
                  push(`${path}${toAddItem}`)
                }}
              >
                Add
              </Button>
            }
            rightSide={<SoftwareList />}
          />
        </Route>
        <Route path={`${path}${toAddItem}`}>
          <HorizontalSplit
            leftSide={<AddEditSoftware />}
            rightSide={
              <Button
                variant={ButtonVariant.outlined}
                onClick={() => {
                  push(`${path}${toList}`)
                }}
              >
                List
              </Button>
            }
          />
        </Route>
        <Route path={`${path}`} exact>
          <Redirect to={`${path}${toList}`} />
        </Route>
      </Switch>
    </>
  )
}
