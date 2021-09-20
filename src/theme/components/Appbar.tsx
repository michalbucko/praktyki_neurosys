import { AppBar, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LogoSvg from 'utils/svg/neurosys-logo-white.svg'
import { AppbarMenu } from 'theme/components/AppbarMenu'
import { useSelectLogin } from 'features/LoginPage/LoginSlice'

export const appBarHeight = 50

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: appBarHeight,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logo: {
    height: '70%',
  },
}))

export const Appbar = () => {
  const { appBar, logo } = useStyles()
  const { user } = useSelectLogin()

  return (
    <AppBar className={appBar} position="static">
      <img className={logo} src={LogoSvg} alt="neuroSYS" />

      <Grid container alignItems="center" spacing={1} justifyContent="flex-end">
        <Grid item>
          <Typography>
            {user?.firstName} {user?.lastName}
          </Typography>
        </Grid>
        <Grid item>
          <AppbarMenu />
        </Grid>
      </Grid>
    </AppBar>
  )
}
