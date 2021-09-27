import { PayloadAction } from '@reduxjs/toolkit'
import { axios } from 'utils/apiClient'
import { TablePaginationPropsTypes } from 'utils/types/types'
import { AddUser, EditUser } from './types'

export const getUsers = ({ payload }: PayloadAction<TablePaginationPropsTypes>) => {
  const searchQuery = payload.search ? `&search=${payload.search}` : ''
  const sortQuery = payload.sortBy ? `&sortBy=${String(payload.sortBy)}:${payload.sortDirection?.toUpperCase()}` : ''

  const url = `/users/?page=${payload.page}&limit=${payload.pageSize}${searchQuery}${sortQuery}`

  return axios.get(url)
}

export const getUserById = ({ payload: userId }: PayloadAction<string>) => axios.get(`/users/${userId}`)

export const deleteUser = ({ payload: id }: PayloadAction<number>) => axios.delete(`/users/${id}`)

export const postUser = ({ payload: { postUser: user } }: PayloadAction<AddUser>) => axios.post('/users', user)

export const patchUser = ({
  payload: {
    patchUser: { id, user },
  },
}: PayloadAction<EditUser>) => axios.patch(`/users/${id}`, user)
