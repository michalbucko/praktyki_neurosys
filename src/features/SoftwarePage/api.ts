import { PayloadAction } from '@reduxjs/toolkit'
import { axios } from 'utils/apiClient'
import { OnRequest, TablePaginationPropsTypes } from 'utils/types/types'
import { FormValues, SoftwareCategoryName } from './types'

export type PostSoftwarePayloadProp = OnRequest & {
  software: FormValues
}

type SoftwareToPatch = {
  id: string
  data: FormValues
}

export type PatchSoftwarePayloadProps = OnRequest & {
  software: SoftwareToPatch
}

export type PostSoftwareCategoryPayloadProp = OnRequest & {
  name: SoftwareCategoryName
}

export type DeleteSoftwareCategoryPayloadProp = OnRequest & {
  id: number
}

export type PatchSoftwareCategoryPayloadProp = OnRequest & {
  id: number
  name: SoftwareCategoryName
}

export const getSoftware = ({ payload }: PayloadAction<TablePaginationPropsTypes>) => {
  const searchQuery = payload.search ? `&search=${payload.search}` : ''
  const sortQuery = payload.sortBy ? `&sortBy=${String(payload.sortBy)}:${payload.sortDirection?.toUpperCase()}` : ''

  const url = `/software/?page=${payload.page}&limit=${payload.pageSize}${searchQuery}${sortQuery}`
  return axios.get(url)
}

export const getSoftwareById = ({ payload: id }: PayloadAction<string>) => axios.get(`/software/${id}`)

export const postSoftwareRequest = ({ payload }: PayloadAction<PostSoftwarePayloadProp>) =>
  axios.post('/software', payload.software)

export const deleteSoftwareRequest = ({ payload: id }: PayloadAction<number>) => axios.delete(`/software/${id}`)

export const patchSoftwareRequest = ({ payload }: PayloadAction<PatchSoftwarePayloadProps>) =>
  axios.patch(`/software/${payload.software.id}`, payload.software.data)

export const getSoftwareCategory = () => axios.get('/software-category')

export const postSoftwareCategoryRequest = ({ payload }: PayloadAction<PostSoftwareCategoryPayloadProp>) =>
  axios.post('/software-category', payload.name)

export const deleteSoftwareCategoryRequest = ({ payload }: PayloadAction<DeleteSoftwareCategoryPayloadProp>) =>
  axios.delete(`/software-category/${payload.id}`)

export const patchSoftwareCategoryRequest = ({ payload }: PayloadAction<PatchSoftwareCategoryPayloadProp>) =>
  axios.patch(`/software-category/${payload.id}`, payload.name)
