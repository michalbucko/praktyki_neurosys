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
