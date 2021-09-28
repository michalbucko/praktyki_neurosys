/* eslint-disable react-hooks/exhaustive-deps */
import MaterialTable, { Action, Column } from '@material-table/core'
import Edit from '@material-ui/icons/Edit'
import { useHistory } from 'react-router-dom'
import { useDispatchSoftware, useSelectSoftware } from 'features/SoftwarePage/SoftwareSlice'
import { Software } from 'features/SoftwarePage/types'
import { toSoftwarePage } from 'routes/routes'
import { getPaginationTableFields } from 'utils/getPaginationTableFields'
import { toEditItem } from 'features/SoftwarePage/routes'
import { useEffect } from 'react'

const columns: Column<Software>[] = [
  { title: 'Brand', field: 'company' },
  { title: 'Software', field: 'name' },
  // { title: 'Category', field: 'category' },
  { title: 'Expiration date', field: 'expDate' },
  { title: 'Number of devices', field: 'numberOfUses' },
]

export const SoftwareTable = () => {
  const { push } = useHistory()
  const { deleteSoftware, fetchSoftwares } = useDispatchSoftware()
  const { softwares } = useSelectSoftware()

  useEffect(() => {
    fetchSoftwares({
      page: softwares.meta?.currentPage || 1,
      pageSize: softwares.meta?.itemsPerPage || 10,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tableData: Software[] = softwares.data.map((software) => ({
    ...software,
    expDate: software.expDate ? new Date(software.expDate).toLocaleDateString() : '-',
    // dodać category?
  }))

  const actions: ((rowData: Software) => Action<Software>)[] = [
    (rowData) => ({
      icon: () => <Edit color="primary" />,
      tooltip: 'Edit software',
      onClick: () => push(`${toSoftwarePage}${toEditItem}/${rowData.id}`),
    }),
  ]

  return (
    <MaterialTable
      data={tableData}
      {...getPaginationTableFields(softwares, fetchSoftwares, columns, deleteSoftware, actions)}
    />
  )
}
