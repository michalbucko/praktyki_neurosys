import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { Action, Column } from '@material-table/core'
import { GenericFeatureStateTypeWithMultipleElements, TablePaginationPropsTypes } from './types/types'
import { tableIcons } from './tableIcons'

export const getPaginationTableFields = <T extends { id: number }>(
  data: GenericFeatureStateTypeWithMultipleElements<T>,
  fetchingAction: ActionCreatorWithPayload<TablePaginationPropsTypes, string>,
  columns: Column<T>[],
  deleteAction: ActionCreatorWithPayload<number, string>,
  actions: ((rowData: T) => Action<T>)[]
) => {
  return {
    isLoading: data.isLoading,
    totalCount: data.meta?.totalItems,
    page: data.meta?.currentPage ? data.meta?.currentPage - 1 : 0,
    icons: tableIcons,
    options: {
      pageSizeOptions: [5, 10, 20, 50],
      pageSize: data.meta?.itemsPerPage || 10,
      emptyRowsWhenPaging: false,
      searchText: data.meta?.search || '',
      showTitle: false,
      actionsColumnIndex: -1,
      debounceInterval: 500,
    },
    onSearchChange: (searchText: string) => {
      fetchingAction({
        page: 1,
        pageSize: data.meta?.itemsPerPage || 10,
        search: searchText,
        sortBy: data.meta?.sortBy[0][0] || 'id',
        sortDirection: data.meta?.sortBy[0][1] || 'asc',
      })
    },
    onOrderChange: (orderBy: number, orderDireciton: string) => {
      fetchingAction({
        page: 1,
        pageSize: data.meta?.itemsPerPage || 10,
        search: data.meta?.search || '',
        sortBy: orderBy >= 0 ? columns[orderBy].field : 'id',
        sortDirection: orderDireciton || 'asc',
      })
    },
    onPageChange: (page: number) => {
      fetchingAction({
        page: page + 1,
        pageSize: data.meta?.itemsPerPage || 10,
        search: data.meta?.search || '',
        sortBy: data.meta?.sortBy[0][0] || 'id',
        sortDirection: data.meta?.sortBy[0][1] || 'asc',
      })
    },
    onRowsPerPageChange: (pageSize: number) => {
      fetchingAction({
        page: 1,
        pageSize,
        search: data.meta?.search || '',
        sortBy: data.meta?.sortBy[0][0] || 'id',
        sortDirection: data.meta?.sortBy[0][1] || 'asc',
      })
    },
    editable: {
      onRowDelete: async (oldData: T) => deleteAction(oldData.id),
    },
    actions,
  }
}
