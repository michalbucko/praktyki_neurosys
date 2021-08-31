import React from 'react'
import { Container } from '@material-ui/core'
import { Column } from '@material-table/core'
import { makeStyles } from '@material-ui/core/styles'
import format from 'date-fns/format'
import { dateFormtWithTime } from 'utils/dateFormat'
import { Operation, useDispatchHistory } from './historySlice'
import { DataTable } from '../../components/DataTable/DataTable'

const columns: Column<Operation>[] = [
  { title: 'Ordering Person Name', field: 'orderingPerson' },
  { title: 'Reciving Person Name', field: 'recivingPerson' },
  { title: 'Operation Description', field: 'operationDescription' },
  {
    title: 'Operation Date',
    field: 'operationDate',
    render: ({ operationDate }) => <span>{format(new Date(operationDate), dateFormtWithTime)}</span>,
  },
]

const useStyles = makeStyles({
  wrapper: {
    marginTop: '30px',
  },
})

export const OperationTableWrapper = () => {
  const { wrapper } = useStyles()
  const { getHistorySuccess, getHistoryError } = useDispatchHistory()

  return (
    <Container maxWidth="md" className={wrapper}>
      <DataTable
        title="Operation history"
        columns={columns}
        actions={{ success: getHistorySuccess, error: getHistoryError }}
        urlParams={{
          filter: 'filter',
          orderBy: 'orderBy',
          orderDirection: 'orderDirection',
          path: '/history',
          page: 'page',
          limit: 'limit',
        }}
      />
    </Container>
  )
}
