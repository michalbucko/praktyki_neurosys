import { PayloadAction } from '@reduxjs/toolkit'

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

export type Location = {
  id: number
  name: string
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
}

export type LoadingState = {
  isLoading: boolean
}

export type UserState = LoadingState & {
  data: User[]
}

export type LocationState = LoadingState & {
  data: Location[]
}

export type UserToEditState = LoadingState & {
  data: UserToEdit | null
}

export type UsersSliceState = {
  users: UserState
  location: LocationState
  userToEdit: UserToEditState
  message: string
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

export type PayloadActionEditUser = PayloadAction<{
  patchUser: PatchUser
  onSuccess: () => void
}>

export type PayloadActionAddUser = PayloadAction<{
  postUser: PostUser
  onSuccess: () => void
}>
