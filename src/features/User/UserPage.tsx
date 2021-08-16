import { useState } from 'react'
import UsersList from 'features/User/components/UserList'
import styled from 'styled-components'
import UserAddForm, { FormValues } from 'features/User/components/UserAddForm'

export type User = {
  id: number
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

export const UserPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [lastIndex, setLastIndex] = useState(0)

  const onRemove = (userId: number) => {
    setUsers((state) => state.filter((user) => user.id !== userId))
  }

  const onSave = (values: FormValues) => {
    setUsers((state) => {
      return [
        ...state,
        {
          id: lastIndex + 1,
          ...values,
        },
      ]
    })
    setLastIndex((state) => state + 1)
  }

  return (
    <Wrapper>
      <UsersList users={users} onRemove={onRemove} />
      <UserAddForm onSave={onSave} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: flex-start;
`
export default UserPage
