import { Button, Divider, ListItem, ListItemText } from '@material-ui/core'
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
      {softwares.map((software) => (
        <Fragment key={software.id}>
          <ListItem key={software.id} disableGutters>
            <ListItemText
              primary={`${software.company} ${software.name}`}
              secondary={`${software.category},${software.expDate},${software.amount}`}
            />
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
              variant="contained"
              startIcon={<Delete />}
              disableElevation
              onClick={() => removeSoftware(software.id)}
            >
              Remove
            </Button>
          </ListItem>
          <Divider variant="fullWidth" />
        </Fragment>
      ))}
    </>
  )
}

export default Softwares
