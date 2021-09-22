import { Device } from 'features/HardwarePage/types'
import { Software } from 'features/SoftwarePage/types'
import { User } from 'features/User/types'

export type Meta = {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  totalPages: number
  sortBy: string[]
  search?: string
}
export type GenericFeatureStateTypeWithMultipleElements<T> = {
  data: T[]
  meta?: Meta | null
  links?: string
  isLoading: boolean
}
export type GenericFeatureStateTypeWithSingleElement<T> = {
  data: T | null
  isLoading: boolean
}

export type OnRequest = {
  onSuccess: () => void
  onFail?: () => void
}

export type TablePaginationPropsTypes = {
  page: number
  pageSize: number
  search?: string
  sortBy?: number | string | symbol
  sortDirection?: string
}

export type FeatureType = Device | User | Software
