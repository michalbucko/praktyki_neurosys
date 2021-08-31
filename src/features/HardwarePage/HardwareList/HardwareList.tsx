import React from 'react'
import { List, Typography, Button, Box } from '@material-ui/core'
import { toHardwarePage } from 'routes/routes'
import AddCircle from '@material-ui/icons/AddCircle'
import { useHistory } from 'react-router'
import { toAddItem } from '../routes'
import { ListItems } from './ListItems/ListItems'

export const HarwareList = (): JSX.Element => {
  const { push } = useHistory()

  return (
    <List>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h1" color="primary">
          Devices List
        </Typography>
        <Button startIcon={<AddCircle />} onClick={() => push(`${toHardwarePage}${toAddItem}`)}>
          Add new device
        </Button>
      </Box>
      <Box mt={2}>
        <ListItems />
      </Box>
    </List>
  )
}
