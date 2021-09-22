import { PayloadAction } from '@reduxjs/toolkit'
import { OnRequest } from 'utils/types/types'
import { axios } from '../../utils/apiClient'
import { LocationName } from './types'

export const getLocations = () => axios.get('/location')

export type PostLocationPayloadProp = OnRequest & {
  name: LocationName
}

export const postLocationRequest = ({ payload }: PayloadAction<PostLocationPayloadProp>) =>
  axios.post('/location', payload.name)

export type DeleteLocationPayloadProp = OnRequest & {
  id: number
}

export const deleteLocationRequest = ({ payload }: PayloadAction<DeleteLocationPayloadProp>) =>
  axios.delete(`/location/${payload.id}`)

export type PatchLocationPayloadProp = OnRequest & {
  name: LocationName
  id: number
}

export const patchLocationRequest = ({ payload }: PayloadAction<PatchLocationPayloadProp>) =>
  axios.patch(`/location/${payload.id}`, payload.name)
