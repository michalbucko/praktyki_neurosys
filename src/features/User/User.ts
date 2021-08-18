export type User = {
  id: string
  firstName: string
  lastName: string
  role: string
  location: string
  position: string
  email: string
  password?: string
  beginDate?: Date | string
  endDate?: Date | string
}

export type UserState = {
  users: User[]
}
