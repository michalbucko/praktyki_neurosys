/* eslint-disable react-hooks/exhaustive-deps */
import MaterialTable, { Action, Column } from '@material-table/core'
import Edit from '@material-ui/icons/Edit'
import { useHistory } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { TablePagination } from '@material-ui/core'
import { useDispatchDevices, useSelectHardware } from 'features/HardwarePage/hardwareSlice'
import { tableIcons } from 'utils/tableIcons'
import { toEditItem } from '../../routes'
import { Device } from '../../types'

const columns: Column<Device>[] = [
  { title: 'Type', field: 'type' },
  { title: 'Model', field: 'model' },
  { title: 'Serial Number', field: 'serialNumber' },
  { title: 'Created at', field: 'createdAt' },
  { title: 'Deleted at', field: 'deletedAt' },
]

export const HardwareTable = () => {
  const { push } = useHistory()
  const { devices } = useSelectHardware()
  const { deleteDevice, fetchDevices } = useDispatchDevices()

  const tableData: Device[] = devices.data.map((device) => ({
    ...device,
    createdAt: new Date(device.createdAt).toLocaleDateString(),
    deletedAt: device.deletedAt ? new Date(device.deletedAt).toLocaleDateString() : '-',
  }))

  const actions: ((rowData: Device) => Action<Device>)[] = [
    (rowData) => ({
      icon: () => <Edit />,
      tooltip: 'Edit user',
      onClick: () => push(`${toHardwarePage}${toEditItem}/${rowData.id}`),
    }),
  ]

  return (
    <MaterialTable
      columns={columns}
      onSearchChange={(searchText) => {
        fetchDevices({
          page: devices.meta?.currentPage,
          pageSize: devices.meta?.itemsPerPage,
          search: searchText,
          sortBy: devices.meta?.sortBy[0][0],
          sortDirection: devices.meta?.sortBy[0][1],
        })
      }}
      onOrderChange={(orderBy, orderDireciton) => {
        fetchDevices({
          page: devices.meta?.currentPage,
          pageSize: devices.meta?.itemsPerPage,
          search: devices.meta?.search,
          sortBy: orderBy >= 0 ? columns[orderBy].field : '',
          sortDirection: orderDireciton || 'asc',
        })
      }}
      data={tableData}
      icons={tableIcons}
      actions={actions}
      components={{
        Pagination: (props) => (
          <TablePagination
            {...props}
            count={devices.meta?.totalItems}
            page={devices.meta ? devices.meta?.currentPage - 1 : 0}
            rowsPerPage={devices.meta?.itemsPerPage}
            onPageChange={(e, page) => {
              fetchDevices({
                page: page + 1,
                pageSize: devices.meta?.itemsPerPage,
                search: devices.meta?.search,
                sortBy: devices.meta?.sortBy[0][0],
                sortDirection: devices.meta?.sortBy[0][1],
              })
            }}
            onRowsPerPageChange={(event) => {
              fetchDevices({
                page: 1,
                pageSize: parseInt(event.target.value, 10),
                search: devices.meta?.search,
                sortBy: devices.meta?.sortBy[0][0],
                sortDirection: devices.meta?.sortBy[0][1],
              })
            }}
          />
        ),
      }}
      options={{
        emptyRowsWhenPaging: false,
        searchText: devices.meta?.search,
        showTitle: false,
        actionsColumnIndex: -1,
        pageSize: devices.meta?.itemsPerPage,
        rowStyle: {
          fontSize: '1rem',
        },
        debounceInterval: 500,
      }}
      editable={{
        onRowDelete: async (oldData) => deleteDevice(oldData.id),
      }}
    />
  )
}
