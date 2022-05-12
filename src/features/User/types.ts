import { Device } from 'features/HardwarePage/types'
import { Software } from 'features/SoftwarePage/types'
import { Location } from 'shared/location/types'
import {
  GenericFeatureStateTypeWithMultipleElements,
  GenericFeatureStateTypeWithSingleElement,
  OnRequest,
} from 'utils/types/types'

export type User = {
  id: number
  firstName: string
  lastName: string
  role: string
  location: number
  position: string
  email: string
  password: string
  beginDate: Date
  endDate?: Date | null
}

export type UserToEdit = {
  id: number
  email: string
  firstName: string
  lastName: string
  position: string
  beginDate: Date
  endDate: Date | null
  location: Location
  devices: Device[]
  softwares: Software[]
}

export type UsersSliceState = {
  users: GenericFeatureStateTypeWithMultipleElements<User>
  userToEdit: GenericFeatureStateTypeWithSingleElement<UserToEdit>
}

export type PostUser = {
  email: string
  password: string
  firstName: string
  lastName: string
  position: string
  beginDate: string
  endDate?: string
  location: number
}

export type PatchUser = {
  id: number
  user: {
    firstName: string
    lastName: string
    position: string
    beginDate: string
    endDate?: string
    location: number
  }
}

export type EditUser = OnRequest & {
  patchUser: PatchUser
}

export type AddUser = OnRequest & {
  postUser: PostUser
}

export type UserTableData = {
  id: number
  firstName: string
  lastName: string
  position: string
  beginDate: string
  endDate?: string
}

export type GetUsers = {
  id: number
  firstName: string
  lastName: string
  position: string
  beginDate: string
  endDate?: string
}
