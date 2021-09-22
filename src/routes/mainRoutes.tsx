import { Layout } from 'theme/Layout'
import { Routes } from 'routes/routes'
import { Switch } from 'react-router'
import { useDispatchLogin, useSelectLogin } from 'features/LoginPage/LoginSlice'
import { useEffect } from 'react'
import { getAccessToken } from 'utils/setAccessToken'
import Loader from 'components/Loader/Loader'

export const MainRoutes = () => {
  const { isLoading, user } = useSelectLogin()
  const { logOut } = useDispatchLogin()

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!getAccessToken() && !!user) {
        logOut()
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, [user, logOut])

  return (
    <Switch>
      <Loader isLoading={isLoading}>
        <Layout>
          <Routes />
        </Layout>
      </Loader>
    </Switch>
  )
}
