import React, { FC } from 'react'
import { CircularProgress, createStyles, Grid, makeStyles } from '@material-ui/core'
import { isEmpty } from 'lodash'

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      fontSize: theme.typography.h2.fontSize,
    },
    grid: {
      position: 'relative',
    },
    wrapperLoader: {
      zIndex: 1000,
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
  objects?: any
}

const Loader: FC<Props> = ({ isLoading, objects, children }) => {
  const { title, grid, wrapperLoader } = useStyles()

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

    return null
  }

  const view = getViewElement()

  return (
    <Grid container justifyContent="center" className={title}>
      {view || (
        <Grid item xs>
          {children}
        </Grid>
      )}
    </Grid>
  )
}

export default Loader
