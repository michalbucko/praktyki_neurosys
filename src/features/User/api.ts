import { PayloadAction } from '@reduxjs/toolkit'
import { axios } from 'utils/apiClient'
import { PayloadActionAddUser, PayloadActionEditUser } from './types'

export const getUsers = () => axios.get('/users')

export const getUserById = ({ payload: userId }: PayloadAction<string>) => axios.get(`/users/${userId}`)

export const deleteUser = ({ payload: userId }: PayloadAction<number>) => axios.delete(`/users/${userId}`)

export const postUser = ({ payload: { postUser: user } }: PayloadActionAddUser) => axios.post('/users', user)

export const patchUser = ({
  payload: {
    patchUser: { id, user },
  },
}: PayloadActionEditUser) => axios.patch(`/users/${id}`, user)

export const getLocation = () => axios.get('/location')
