import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router'
import { toSoftwarePage } from 'routes/routes'
import { Box, List, Typography } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import { Softwares } from 'features/SoftwarePage/components/SoftwareList/SoftwareItems'
import { toAddItem } from '../../routes'

export const SoftwareList = () => {
  const { push } = useHistory()

  return (
    <List>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h1" color="primary">
          Licence list
        </Typography>
        <Button
          startIcon={<AddCircle />}
          onClick={() => {
            push(`${toSoftwarePage}${toAddItem}`)
          }}
        >
          Add new licence
        </Button>
      </Box>
      <Box mt={2}>
        <Softwares />
      </Box>
    </List>
  )
}
