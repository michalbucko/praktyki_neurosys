import { PayloadAction } from '@reduxjs/toolkit'
import { axios } from '../../utils/apiClient'
import { DeviceBrandName, FormValues } from './types'
import { OnRequest } from '../../utils/types/types'

export type GetDevicesPayloadProp = {
  page: number
  pageSize: number
  search?: string
  sortBy?: string
  sortDirection?: string
}

export const getDevices = ({ payload }: PayloadAction<GetDevicesPayloadProp>) => {
  const searchQuery = payload.search ? `&search=${payload.search}` : ''
  const sortQuery = payload.sortBy ? `&sortBy=${payload.sortBy}:${payload.sortDirection?.toUpperCase()}` : ''

  const url = `/devices/?page=${payload.page}&limit=${payload.pageSize}${searchQuery}${sortQuery}`

  return axios.get(url)
}

export const getDevice = ({ payload: id }: PayloadAction<string>) => axios.get(`/devices/${id}`)

export type PostDevicePayloadProp = OnRequest & {
  device: FormValues
}

export const postDeviceRequest = ({ payload }: PayloadAction<PostDevicePayloadProp>) =>
  axios.post('/devices', payload.device)

export const deleteDeviceRequest = ({ payload: id }: PayloadAction<number>) => axios.delete(`/devices/${id}`)

type DeviceToPatch = {
  id: string
  data: FormValues
}

export type PatchDevicePayloadProps = OnRequest & {
  device: DeviceToPatch
}

export const patchDeviceRequest = ({ payload }: PayloadAction<PatchDevicePayloadProps>) =>
  axios.patch(`/devices/${payload.device.id}`, payload.device.data)

export const getDevicesBrands = () => axios.get('/device-brands')

export type PostDeviceBrandPayloadProp = OnRequest & {
  name: DeviceBrandName
}

export const postDeviceBrandRequest = ({ payload }: PayloadAction<PostDeviceBrandPayloadProp>) =>
  axios.post('/device-brands', payload.name)

export type DeleteDeviceBrandPayloadProp = OnRequest & {
  id: number
}

export const deleteDeviceBrandRequest = ({ payload }: PayloadAction<DeleteDeviceBrandPayloadProp>) =>
  axios.delete(`/device-brands/${payload.id}`)

export type PatchDeviceBrandPayloadProp = OnRequest & {
  id: number
  name: DeviceBrandName
}

export const patchDeviceBrandRequest = ({ payload }: PayloadAction<PatchDeviceBrandPayloadProp>) =>
  axios.patch(`/device-brands/${payload.id}`, payload.name)
