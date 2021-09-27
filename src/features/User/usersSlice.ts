import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { AddUser, EditUser, User, UsersSliceState, UserToEdit } from 'features/User/types'
import { useInjectSaga } from 'redux-injectors'
import { userSaga } from 'features/User/UserSaga'
import { GenericFeatureStateTypeWithMultipleElements, TablePaginationPropsTypes } from 'utils/types/types'

const initialState: UsersSliceState = {
  users: {
    data: [],
    isLoading: false,
    meta: null,
    links: '',
  },
  userToEdit: {
    data: null,
    isLoading: false,
  },
}

export const usersSlice = createSlice({
  initialState,
  name: 'usersSlice',
  reducers: {
    // fetch users
    fetchUsers: (state: UsersSliceState, { payload }: PayloadAction<TablePaginationPropsTypes>) => {
      state.users.isLoading = true
    },
    fetchUsersSuccess: (
      state: UsersSliceState,
      { payload }: PayloadAction<GenericFeatureStateTypeWithMultipleElements<User>>
    ) => {
      state.users.data = payload.data
      state.users.meta = payload.meta
      state.users.links = payload.links
      state.users.isLoading = false
    },
    fetchUsersFail: (state: UsersSliceState) => {
      state.users.isLoading = false
    },

    // fetch user to edit
    fetchUserToEdit: (state: UsersSliceState, { payload }: PayloadAction<string>) => {
      state.userToEdit.isLoading = true
    },
    fetchUserToEditSuccess: (state: UsersSliceState, { payload }: PayloadAction<UserToEdit>) => {
      state.userToEdit.data = payload
      state.userToEdit.isLoading = false
    },
    fetchUserToEditFail: (state: UsersSliceState) => {
      state.userToEdit.isLoading = false
    },

    // remove user
    removeUser: (state: UsersSliceState, { payload }: PayloadAction<number>) => {},

    // add user
    addUser: (state: UsersSliceState, { payload }: PayloadAction<AddUser>) => {},

    // edit user
    editUser: (state: UsersSliceState, { payload }: PayloadAction<EditUser>) => {},
  },
})

export default usersSlice.reducer

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFail,
  fetchUserToEdit,
  fetchUserToEditSuccess,
  fetchUserToEditFail,
  removeUser,
  addUser,
  editUser,
} = usersSlice.actions

export const useSelectUsers = () => useSelector((state: RootState) => state.usersState)

export const useDisptachUsers = () => {
  const { actions, name } = usersSlice
  const dispatch = useDispatch()
  useInjectSaga({ key: name, saga: userSaga })
  return bindActionCreators(actions, dispatch)
}
