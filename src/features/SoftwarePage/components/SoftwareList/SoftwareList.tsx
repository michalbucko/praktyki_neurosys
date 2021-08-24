import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router'
import { toSoftwarePage } from 'routes/routes'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import Softwares from 'features/SoftwarePage/components/SoftwareList/SoftwareItems'
import { List } from 'components/List'
import { toAddItem } from '../../routes'

const useStyles = makeStyles({
  gridContainer: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 25,
  },
})

export const SoftwareList = () => {
  const { gridContainer } = useStyles()

  const { push } = useHistory()
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid className={gridContainer} item container xs={12} spacing={1} justifyContent="space-between">
          <Typography variant="h4" color="primary">
            Licence list
          </Typography>
          <Button
            variant="text"
            size="small"
            startIcon={<AddCircle />}
            onClick={() => {
              push(`${toSoftwarePage}${toAddItem}`)
            }}
          >
            Add new Licence
          </Button>
        </Grid>
        <Grid item xs={12}>
          <List>
            <Softwares />
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}
