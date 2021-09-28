import { axios } from 'utils/apiClient'

export type Stats = {
  users: number
  softwares: number
  devices: number
}

export const getStats = () => axios.get(`/stats`)
