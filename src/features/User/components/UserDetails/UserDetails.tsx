import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography,
  Theme,
  Button,
  Avatar,
} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { green } from '@material-ui/core/colors'
import { useHistory, useParams } from 'react-router'
import { toList } from 'features/User/routes'
import Loader from 'components/Loader/Loader'
import { useDisptachUsers, useSelectUsers } from 'features/User/usersSlice'
import { toUsersPage } from '../../../../routes/routes'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing(15),
    height: theme.spacing(15),
    backgroundColor: green[500],
  },
  typographyMargin: {
    marginBottom: theme.spacing(5),
  },
}))

export const UserDetails = () => {
  const { container, avatar, typographyMargin } = useStyles()
  const { push } = useHistory()
  const { userToEdit } = useSelectUsers()
  const { fetchUserToEdit } = useDisptachUsers()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    fetchUserToEdit(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGoBackButtonClick = () => push(`${toUsersPage}${toList}`)

  return (
    <>
      <Loader isLoading={userToEdit.isLoading}>
        <Container className={container} maxWidth="md">
          <Grid container spacing={2}>
            <Avatar className={avatar}>{userToEdit.data?.firstName.slice(0, 1).toUpperCase()}</Avatar>
            <Grid item xs={12}>
              <Button startIcon={<ArrowBack />} onClick={handleGoBackButtonClick}>
                Go back
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography color="primary" align="center" variant="h2">
                {`${userToEdit.data?.firstName} ${userToEdit.data?.lastName} `}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="h5">
                Position: {`${userToEdit.data?.position}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={typographyMargin} align="center" variant="h5">
                Location: {`${userToEdit.data?.location.name}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListSubheader>
                  <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="h5" component="h3" color="primary">
                        Devices
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary">
                        Asign devices
                      </Button>
                    </Grid>
                  </Grid>
                </ListSubheader>
                {userToEdit.data?.devices.map((device) => (
                  <ListItem divider>
                    <ListItemText primary={device.createdAt} secondary={device.id} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListSubheader>
                  <Grid container spacing={3} justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h5" component="h3" color="primary">
                        Software
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary">
                        Asign software
                      </Button>
                    </Grid>
                  </Grid>
                </ListSubheader>
                {userToEdit.data?.softwares.map((software) => (
                  <ListItem divider>
                    <ListItemText primary={software.id} secondary={software.id} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Loader>
    </>
  )
}
