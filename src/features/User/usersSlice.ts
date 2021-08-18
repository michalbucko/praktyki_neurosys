import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { User, UserState } from 'features/User/User'

const initialState: UserState = {
  users: [],
}

export const usersSlice = createSlice({
  initialState,
  name: 'usersSlice',
  reducers: {
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users = [...state.users, payload]
    },
    removeUser: (state, { payload }: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== payload)
    },
    editUser: (state: UserState, { payload: editedUser }: PayloadAction<User>) => ({
      ...state,
      users: state.users.map((user: User) => (editedUser.id === user.id ? { ...editedUser } : { ...user })),
    }),
  },
})

export default usersSlice.reducer

export const useSelectUsers = () => useSelector((state: RootState) => state.usersState)

export const useDisptachUsers = () => {
  const { actions } = usersSlice
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
