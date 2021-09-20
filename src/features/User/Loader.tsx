import React, { FC } from 'react'
import { CircularProgress, createStyles, Grid, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    grid: {
      position: 'relative',
    },
    wrapperLoader: {
      background: theme.palette.background.paper,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
)

type Props = {
  isLoading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objects?: any[]
  emptyLabel?: string
}

const Loader: FC<Props> = ({ isLoading, objects, children }) => {
  const { grid, wrapperLoader } = useStyles()

  const getViewElement = () => {
    // refetch objects
    if (isLoading && objects && !isEmpty(objects)) {
      return (
        <Grid item xs className={grid}>
          {children}
          <div className={wrapperLoader}>
            <CircularProgress />
          </div>
        </Grid>
      )
    }
    // first fetch
    if (isLoading) {
      return (
        <Grid item>
          <CircularProgress />
        </Grid>
      )
    }
    // after fetch, no elements
    if (objects && isEmpty(objects)) {
      return (
        <Grid item>
          <Typography variant="h2">no elements</Typography>
        </Grid>
      )
    }

    return null
  }

  const view = getViewElement()

  return (
    <Grid container justifyContent="center">
      {view || (
        <Grid item xs>
          {children}
        </Grid>
      )}
    </Grid>
  )
}

export default Loader
