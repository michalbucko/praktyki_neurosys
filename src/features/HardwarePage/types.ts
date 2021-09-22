import { Location } from 'shared/location/types'
import {
  GenericFeatureStateTypeWithMultipleElements,
  GenericFeatureStateTypeWithSingleElement,
} from 'utils/types/types'

export type DeviceBrandName = {
  name: string
}

export type DeviceBrand = {
  createdAt: string
  deletedAt: null | string
  id: number
  name: string
}

export type FormValues = {
  type: string
  brand: number
  model: string
  serialNumber: string
  location: number
}

export type Device = {
  createdAt: string
  deletedAt: null | string
  id: number
  type: string
  model: string
  serialNumber: string
  location?: Location
  brand?: DeviceBrand
}

export type HardwareState = {
  devices: GenericFeatureStateTypeWithMultipleElements<Device>
  devicesBrands: GenericFeatureStateTypeWithMultipleElements<DeviceBrand>
  device: GenericFeatureStateTypeWithSingleElement<Device>
}
