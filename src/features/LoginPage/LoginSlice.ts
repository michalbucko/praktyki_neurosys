import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'features/User/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { useInjectSaga } from 'redux-injectors'
import { AuthType } from './AuthType'
import { loginSaga } from './LoginSaga'

export type LoginType = {
  user?: User
  isAuth: boolean
  isLoading: boolean
}

const initialState: LoginType = {
  isAuth: false,
  isLoading: false,
}

export const loginSlice = createSlice({
  initialState,
  name: 'login',
  reducers: {
    logIn: (state, { payload }: PayloadAction<AuthType>) => {
      state.isLoading = true
    },
    logOut: (state) => {
      state.isAuth = false
      state.isLoading = false
      state.user = undefined
    },
    logPending: (state) => {
      state.isLoading = true
    },
    logSuccess: (state, { payload }: PayloadAction<User>) => {
      state.isAuth = true
      state.isLoading = false
      state.user = payload
    },
    logFailure: (state) => {
      state.isAuth = false
      state.isLoading = false
      state.user = undefined
    },
  },
})

export const useDispatchLogin = () => {
  const { actions, name } = loginSlice
  const dispatch = useDispatch()
  useInjectSaga({ key: name, saga: loginSaga })
  return bindActionCreators(actions, dispatch)
}

export const { logIn, logOut, logSuccess, logPending, logFailure } = loginSlice.actions

export const useSelectLogin = () => useSelector((state: RootState): LoginType => state.loginState)

export default loginSlice.reducer
