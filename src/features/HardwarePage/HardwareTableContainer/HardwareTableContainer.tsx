import React from 'react'
import { Typography, Button, Box, Theme } from '@material-ui/core'
import { toHardwarePage } from 'routes/routes'
import AddCircle from '@material-ui/icons/AddCircle'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/styles'
import { toAddItem } from '../routes'
import { HardwareTable } from './HardwareTable/HardwareTable'

const useStyles = makeStyles((theme: Theme) => ({
  tableWrapper: {
    fontSize: theme.typography.body1.fontSize,
    '& > *': {
      boxShadow: 'none',
    },
  },
}))

export const HardwareListContainer = (): JSX.Element => {
  const { tableWrapper } = useStyles()
  const { push } = useHistory()

  return (
    <>
      <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
        <Typography variant="h1" color="primary">
          Devices List
        </Typography>
        <Button startIcon={<AddCircle />} onClick={() => push(`${toHardwarePage}${toAddItem}`)}>
          Add new device
        </Button>
      </Box>
      <Box className={tableWrapper}>
        <HardwareTable />
      </Box>
    </>
  )
}
