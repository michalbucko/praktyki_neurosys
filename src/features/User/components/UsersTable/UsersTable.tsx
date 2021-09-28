/* eslint-disable react-hooks/exhaustive-deps */
import { useDisptachUsers, useSelectUsers } from 'features/User/usersSlice'
import MaterialTable, { Action, Column } from '@material-table/core'
import { UserTableData } from 'features/User/types'
import Edit from '@material-ui/icons/Edit'
import { useHistory } from 'react-router-dom'
import { toUsersPage } from 'routes/routes'
import { toAddUser, toEditItem, toList } from 'features/User/routes'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import { useEffect } from 'react'
import { getPaginationTableFields } from 'utils/getPaginationTableFields'
import MoreIcon from '@mui/icons-material/More'

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    fontSize: theme.typography.body1.fontSize,
    '& > *': {
      boxShadow: 'none',
    },
  },
}))

const columns: Column<UserTableData>[] = [
  { title: 'First Name', field: 'firstName' },
  { title: 'Last Name', field: 'lastName' },
  { title: 'Position', field: 'position' },
  { title: 'Begin date', field: 'beginDate', align: 'center' },
  { title: 'End date', field: 'endDate', align: 'center' },
]

export const UsersTable = () => {
  const { push } = useHistory()
  const { users } = useSelectUsers()
  const { fetchUsers, removeUser } = useDisptachUsers()
  const { tableWrapper } = useStyles()
  const defaultPageSize = 10

  useEffect(() => {
    fetchUsers({
      page: users.meta?.currentPage || 1,
      pageSize: users.meta?.itemsPerPage || defaultPageSize,
    })
  }, [])

  const data: UserTableData[] = users.data.map((user) => ({
    ...user,
    beginDate: new Date(user.beginDate).toLocaleDateString(),
    endDate: user.endDate ? new Date(user.endDate).toLocaleDateString() : '-',
  }))

  const actions: ((rowData: UserTableData) => Action<UserTableData>)[] = [
    (rowData) => ({
      icon: () => <Edit color="primary" />,
      tooltip: 'Edit user',
      onClick: () => push(`${toUsersPage}${toEditItem}/${rowData.id}`),
    }),
    (rowData) => ({
      icon: () => <MoreIcon color="primary" />,
      tooltip: 'User details',
      onClick: () => push(`${toUsersPage}${toList}/${rowData.id}`),
    }),
  ]

  return (
    <>
      <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
        <Typography variant="h1" color="primary">
          Users
        </Typography>
        <Button startIcon={<AddCircle />} onClick={() => push(`${toUsersPage}${toAddUser}`)}>
          Add new user
        </Button>
      </Box>
      <Box className={tableWrapper}>
        <MaterialTable data={data} {...getPaginationTableFields(users, fetchUsers, columns, removeUser, actions)} />
      </Box>
    </>
  )
}
