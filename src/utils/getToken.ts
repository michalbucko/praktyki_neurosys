import { PayloadAction } from '@reduxjs/toolkit'
import { AuthType } from 'features/LoginPage/AuthType'
import { axios } from './apiClient'

export const getToken = ({ payload }: PayloadAction<AuthType>) => axios.post('auth/login', payload)

export const setAuth = () => axios.get('/auth/me')
