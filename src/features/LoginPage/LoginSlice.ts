import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'features/User/User'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { AuthType } from './AuthType'

export type LoginType = {
  user?: User
  isAuth: boolean
}

const initialState: LoginType = {
  isAuth: false,
}

export const loginSlice = createSlice({
  initialState,
  name: 'login',
  reducers: {
    logIn: (state, { payload }: PayloadAction<AuthType>) => {
      state.isAuth = true
      state.user = {
        id: '1',
        firstName: 'Bob',
        lastName: 'Ross',
        role: 'PM',
        location: 'Białystok',
        position: 'dev',
        email: 'test@test.pl',
        password: 'password',
      }
    },
  },
})

export const useDispatchLogin = () => {
  const { actions } = loginSlice
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}

export const useSelectLogin = () => useSelector((state: RootState): LoginType => state.loginState)

export default loginSlice.reducer
