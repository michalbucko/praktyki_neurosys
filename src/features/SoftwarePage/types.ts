import {
  GenericFeatureStateTypeWithMultipleElements,
  GenericFeatureStateTypeWithSingleElement,
} from 'utils/types/types'

export type SoftwareCategoryName = {
  name: string
}

export type SoftwareCategory = {
  createdAt: string
  deletedAt: null | string
  id: number
  name: string
}

export type FormValues = {
  company: string
  name: string
  category: number
  expDate?: Date | undefined
  numberOfUses: number
}

export type Software = {
  createdAt: string
  deletedAt: null | string
  id: number
  company: string
  name: string
  category: SoftwareCategory
  expDate?: Date | undefined | string
  numberOfUses?: number
}

export type SoftwareState = {
  softwareCategory: GenericFeatureStateTypeWithMultipleElements<SoftwareCategory>
  softwares: GenericFeatureStateTypeWithMultipleElements<Software>
  software: GenericFeatureStateTypeWithSingleElement<Software>
}
