import { Box, Button, Divider, ListItem, ListItemText } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
import { Fragment } from 'react'
import { useHistory } from 'react-router'
import { toSoftwarePage } from 'routes/routes'
import { toEditItem } from '../../routes'
import { useDispatchSoftware, useSelectSoftware } from '../../SoftwareSlice'

export const Softwares = (): JSX.Element => {
  const { push } = useHistory()
  const { softwares } = useSelectSoftware()
  const { removeSoftware } = useDispatchSoftware()

  return (
    <>
      {softwares.map((software, mapIndex) => (
        <Fragment key={software.id}>
          {mapIndex > 0 && <Divider />}
          <ListItem disableGutters>
            <ListItemText
              primary={`${software.company} ${software.name}`}
              secondary={`${software.category},${software.expDate},${software.amount}`}
            />
            <Box display="grid" gridAutoFlow="column" gridColumnGap={10}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<Edit />}
                disableElevation
                onClick={() => push(`${toSoftwarePage}${toEditItem}/${software.id}`)}
              >
                Edit
              </Button>
              <Button
                color="secondary"
                variant="contained"
                startIcon={<Delete />}
                disableElevation
                onClick={() => removeSoftware(software.id)}
              >
                Remove
              </Button>
            </Box>
          </ListItem>
        </Fragment>
      ))}
    </>
  )
}
