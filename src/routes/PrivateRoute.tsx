import { useSelectLogin } from 'features/LoginPage/LoginSlice'
import { ComponentType } from 'react'
import { Redirect, Route } from 'react-router-dom'

type Props = {
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>
  exact?: boolean
}

export const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const { isAuth } = useSelectLogin()
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <>
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          </>
        )
      }
    />
  )
}
