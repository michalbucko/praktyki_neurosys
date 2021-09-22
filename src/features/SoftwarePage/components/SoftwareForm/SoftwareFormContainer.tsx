import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toSoftwarePage } from 'routes/routes'
import { Button, Typography, Box, Drawer as DrawerWrapper, Theme } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import DevicesIcon from '@material-ui/icons/Devices'
import { makeStyles } from '@material-ui/styles'
import Loader from 'components/Loader/Loader'
import { Column } from '@material-table/core'
import { useDispatchSoftware, useSelectSoftware } from 'features/SoftwarePage/SoftwareSlice'
import { SoftwareCategory } from 'features/SoftwarePage/types'
import { toList } from 'features/SoftwarePage/routes'
import { Drawer } from 'shared/Drawer/Drawer'
import { SoftwareForm } from './SoftwareForm'

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: '40vw',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '60vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
  },
}))

export const SoftwareFormContainer = (): JSX.Element => {
  const [isCategoryActive, setIsCategoryActive] = useState(false)
  const { fetchSoftware, fetchSoftwareCategory, postSoftwareCategory, deleteSoftwareCategory, patchSoftwareCategory } =
    useDispatchSoftware()
  const { id } = useParams<{ id?: string }>()
  const { push } = useHistory()
  const { softwareCategory, software } = useSelectSoftware()
  const { drawer } = useStyles()

  useEffect(() => {
    if (id) {
      fetchSoftware(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    fetchSoftwareCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGoBackButtonClick = () => push(`${toSoftwarePage}${toList}`)

  const softwareColumns: Column<SoftwareCategory>[] = [{ title: 'SoftwareCategory name', field: 'name' }]

  return (
    <>
      <Box maxWidth={800} mx="auto">
        <Box my={2} display="flex" justifyContent="space-between">
          <Button startIcon={<ArrowBack />} onClick={handleGoBackButtonClick}>
            Go back
          </Button>
          <Box>
            <Button color="primary" startIcon={<DevicesIcon />} onClick={() => setIsCategoryActive(true)}>
              Manage categories
            </Button>
          </Box>
        </Box>

        <Typography variant="h2" color="primary">
          {id ? 'Edit' : 'Add new'} software:
        </Typography>
        <Loader isLoading={!!id && (software.isLoading || softwareCategory.isLoading)} objects={softwareCategory.data}>
          <Box mt={2}>
            <SoftwareForm />
          </Box>
        </Loader>
      </Box>

      <DrawerWrapper
        classes={{ paper: drawer }}
        anchor="right"
        open={isCategoryActive}
        onClose={() => setIsCategoryActive(false)}
      >
        <Drawer
          setIsActive={setIsCategoryActive}
          title="Manage categories"
          columns={softwareColumns}
          drawerState={softwareCategory.data}
          actions={{ post: postSoftwareCategory, delete: deleteSoftwareCategory, patch: patchSoftwareCategory }}
        />
      </DrawerWrapper>
    </>
  )
}
