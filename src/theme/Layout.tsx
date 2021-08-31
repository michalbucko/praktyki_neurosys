import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ReactNode } from 'react'
import { Appbar, appBarHeight } from 'theme/components/Appbar'
import { drawerWidth, Sidebar } from 'theme/components/Sidebar'

type Props = {
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    maxHeight: `calc(100vh - ${appBarHeight}px)`,
    overflow: 'auto',
  },
  sidebar: {
    width: drawerWidth,
  },
}))

export const Layout = ({ children }: Props): JSX.Element => {
  const { content, sidebar } = useStyles()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Appbar />
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item className={sidebar}>
            <Sidebar />
          </Grid>
          <Grid item xs>
            <div className={content}>{children}</div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
