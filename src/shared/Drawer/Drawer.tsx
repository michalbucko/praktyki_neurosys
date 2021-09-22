import MaterialTable, { Column } from '@material-table/core'
import { Grid } from '@material-ui/core'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { tableIcons } from 'utils/tableIcons'
import React, { Dispatch, SetStateAction } from 'react'

type Props<T extends { name: string; id: number }> = {
  setIsActive: Dispatch<SetStateAction<boolean>>
  title: string
  columns: Column<T>[]
  drawerState: T[]
  actions: {
    post: ActionCreatorWithPayload<unknown>
    delete: ActionCreatorWithPayload<unknown>
    patch: ActionCreatorWithPayload<unknown>
  }
}

export const Drawer = <T extends { name: string; id: number }>({
  setIsActive,
  title,
  columns,
  drawerState,
  actions,
}: Props<T>) => {
  return (
    <Grid container spacing={2}>
      <MaterialTable
        title={title}
        options={{
          pageSize: 10,
          filtering: false,
          search: true,
          debounceInterval: 500,
        }}
        style={{
          padding: '20px',
        }}
        icons={tableIcons}
        data={drawerState}
        columns={columns}
        editable={{
          onRowAdd: async (newData) => {
            await actions.post({
              name: newData,
              onSuccess: () => {
                setIsActive(false)
              },
            })
            return null
          },

          onRowDelete: async (oldData) => {
            await actions.delete({
              id: oldData.id,
              onSuccess: () => {
                setIsActive(false)
              },
            })
            return null
          },
          onRowUpdate: async (updatedData) => {
            await actions.patch({
              name: { name: updatedData.name },
              id: updatedData.id,
              onSuccess: () => {
                setIsActive(false)
              },
            })
            return null
          },
        }}
      />
    </Grid>
  )
}
