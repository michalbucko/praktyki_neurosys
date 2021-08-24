import React from 'react'
import { List, Typography, Button, Grid } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { toAddItem } from '../routes'
import { ListItems } from './ListItems/ListItems'

export const HarwareList = (): JSX.Element => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} container justifyContent="space-between">
        <Typography variant="h1">Devices List</Typography>
        <Button component={RouterLink} to={`${toHardwarePage}${toAddItem}`} startIcon={<AddCircleIcon />}>
          Add new device
        </Button>
      </Grid>
      <Grid item xs={12}>
        <List disablePadding>
          <ListItems />
        </List>
      </Grid>
    </Grid>
  )
}
