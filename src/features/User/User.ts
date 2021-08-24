export type User = {
  id: string
  firstName: string
  lastName: string
  role: string
  location: string
  position: string
  email: string
  password?: string
  beginDate?: Date | null
  endDate?: Date | null
}

export type UserState = {
  users: User[]
}
