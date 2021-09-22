import { GenericFeatureStateTypeWithMultipleElements } from 'utils/types/types'

export type LocationName = {
  name: string
}

export type Location = {
  createdAt: string
  deletedAt: null | string
  id: number
  name: string
}

export type LocationState = {
  locations: GenericFeatureStateTypeWithMultipleElements<Location>
}
