/* eslint-disable react-hooks/exhaustive-deps */
import MaterialTable, { Action, Column } from '@material-table/core'
import Edit from '@material-ui/icons/Edit'
import { useHistory } from 'react-router-dom'
import { toHardwarePage } from 'routes/routes'
import { useDispatchDevices, useSelectHardware } from 'features/HardwarePage/hardwareSlice'
import { useEffect } from 'react'
import { getPaginationTableFields } from 'utils/getPaginationTableFields'
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

  useEffect(() => {
    fetchDevices({
      page: devices.meta?.currentPage || 1,
      pageSize: devices.meta?.itemsPerPage || 10,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tableData: Device[] = devices.data.map((device) => ({
    ...device,
    createdAt: new Date(device.createdAt).toLocaleDateString(),
    deletedAt: device.deletedAt ? new Date(device.deletedAt).toLocaleDateString() : '-',
  }))

  const actions: ((rowData: Device) => Action<Device>)[] = [
    (rowData) => ({
      icon: () => <Edit color="primary" />,
      tooltip: 'Edit device',
      onClick: () => push(`${toHardwarePage}${toEditItem}/${rowData.id}`),
    }),
  ]

  return (
    <MaterialTable
      data={tableData}
      {...getPaginationTableFields(devices, fetchDevices, columns, deleteDevice, actions)}
    />
  )
}
