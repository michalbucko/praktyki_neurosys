import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import {
  Location,
  PayloadActionAddUser,
  PayloadActionEditUser,
  User,
  UsersSliceState,
  UserToEdit,
} from 'features/User/types'
import { useInjectSaga } from 'redux-injectors'
import { userSaga } from 'features/User/UserSaga'

const initialState: UsersSliceState = {
  users: {
    data: [],
    isLoading: false,
  },
  location: {
    data: [],
    isLoading: false,
  },
  userToEdit: {
    data: null,
    isLoading: false,
  },
  message: '',
}

export const usersSlice = createSlice({
  initialState,
  name: 'usersSlice',
  reducers: {
    // fetch users
    fetchUsers: (state: UsersSliceState) => {
      state.users.isLoading = true
      state.message = 'Users list is fetching'
    },
    fetchUsersSuccess: (state: UsersSliceState, { payload }: PayloadAction<{ data: User[] }>) => {
      state.users.data = payload.data
      state.users.isLoading = false
      state.message = 'Users list fetched'
    },
    fetchUsersFail: (state: UsersSliceState) => {
      state.users.isLoading = false
      state.message = 'Failed to fetch users list'
    },

    // fetch user to edit
    fetchUserToEdit: (state: UsersSliceState, { payload }: PayloadAction<string>) => {
      state.userToEdit.isLoading = true
      state.message = 'User to edit is fetching'
    },
    fetchUserToEditSuccess: (state: UsersSliceState, { payload }: PayloadAction<UserToEdit>) => {
      state.userToEdit.data = payload
      state.userToEdit.isLoading = false
      state.message = 'User to edit fetched'
    },
    fetchUserToEditFail: (state: UsersSliceState) => {
      state.userToEdit.isLoading = false
      state.message = 'Failed to fetch user to edit'
    },

    // remove user
    removeUser: (state: UsersSliceState, { payload }: PayloadAction<number>) => {},
    removeUserSuccess: (state: UsersSliceState) => {
      state.message = 'User removed'
    },
    removeUserFail: (state: UsersSliceState) => {
      state.message = 'Failed to remove user'
    },

    // add user
    addUser: (state: UsersSliceState, { payload }: PayloadActionAddUser) => {},
    addUserSuccess: (state: UsersSliceState) => {
      state.message = 'User added'
    },
    addUserFail: (state: UsersSliceState) => {
      state.message = 'Failed to add user'
    },

    // edit user
    editUser: (state: UsersSliceState, { payload }: PayloadActionEditUser) => {},
    editUserSuccess: (state: UsersSliceState) => {
      state.message = 'User data updated'
    },
    editUserFail: (state: UsersSliceState) => {
      state.message = 'Failed to update user data'
    },

    // fetch location
    fetchLocation: (state: UsersSliceState) => {
      state.location.isLoading = true
      state.message = 'Location is fetching'
    },
    fetchLocationSuccess: (state: UsersSliceState, { payload }: PayloadAction<Location[]>) => {
      state.location.data = payload
      state.location.isLoading = false
      state.message = 'Location fetched'
    },
    fetchLocationFail: (state: UsersSliceState) => {
      state.location.isLoading = false
      state.message = 'Failed to fetch location'
    },
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
  removeUserSuccess,
  removeUserFail,
  addUser,
  addUserSuccess,
  addUserFail,
  editUser,
  editUserSuccess,
  editUserFail,
  fetchLocation,
  fetchLocationSuccess,
  fetchLocationFail,
} = usersSlice.actions

export const useSelectUsers = () => useSelector((state: RootState) => state.usersState)

export const useDisptachUsers = () => {
  const { actions, name } = usersSlice
  const dispatch = useDispatch()
  useInjectSaga({ key: name, saga: userSaga })
  return bindActionCreators(actions, dispatch)
}
