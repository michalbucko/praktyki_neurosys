import React from 'react'
import { Typography, Button, Box, Theme } from '@material-ui/core'
import { toSoftwarePage } from 'routes/routes'
import AddCircle from '@material-ui/icons/AddCircle'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/styles'
import { toAddItem } from 'features/SoftwarePage/routes'
import { SoftwareTable } from './SoftwareTable'

const useStyles = makeStyles((theme: Theme) => ({
  tableWrapper: {
    fontSize: theme.typography.body1.fontSize,
    '& > *': {
      boxShadow: 'none',
    },
  },
}))

export const SoftwareTableContainer = (): JSX.Element => {
  const { tableWrapper } = useStyles()
  const { push } = useHistory()

  return (
    <>
      <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
        <Typography variant="h1" color="primary">
          Software List
        </Typography>
        <Button startIcon={<AddCircle />} onClick={() => push(`${toSoftwarePage}${toAddItem}`)}>
          Add new software
        </Button>
      </Box>
      <Box className={tableWrapper}>
        <SoftwareTable />
      </Box>
    </>
  )
}
