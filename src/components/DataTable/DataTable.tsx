import MaterialTable, { Column } from '@material-table/core'
import axios from 'axios'
import { Operation } from '../../features/OperationHistoryTable/historySlice'
import { tableIcons } from '../../utils/tableIcons'

type Props = {
  title: string
  urlParams: UrlParams
  columns: Column<Operation>[]
  actions: Actions
}

export type Actions = {
  success: (payload: Operation[]) => void
  error: () => void
}

export type UrlParams = {
  filter: string
  orderBy: string
  orderDirection: string
  path: string
  page: string
  limit: string
}

export const DataTable = ({ title, urlParams, columns, actions }: Props) => {
  return (
    <MaterialTable
      options={{
        pageSize: 10,
        filtering: true,
        search: false,
        debounceInterval: 600,
      }}
      style={{
        padding: '20px',
      }}
      icons={tableIcons}
      title={title}
      columns={columns}
      data={(query) =>
        new Promise((resolve, reject) => {
          const filterQuery = query.filters.length
            ? query.filters.map((filter) => `&${urlParams.filter}-${filter.column.field}=${filter.value}`).join('')
            : ''
          const orderByQuery = query.orderBy ? `&${urlParams.orderBy}=${query.orderBy.field}` : ''
          const orderDirectionQuery = query.orderDirection ? `&${urlParams.orderDirection}=${query.orderDirection}` : ''

          const url = `${urlParams.path}?${urlParams.page}=${query.page}&${urlParams.limit}=${query.pageSize}
      ${orderByQuery}${orderDirectionQuery}${filterQuery}`

          axios
            .get(url)
            .then((result) => {
              resolve({
                data: result.data.data,
                page: result.data.page,
                totalCount: result.data.total,
              })
              actions.success(result.data.data)
            })
            .catch(() => {
              reject(new Error())
              actions.error()
            })
        })
      }
    />
  )
}
