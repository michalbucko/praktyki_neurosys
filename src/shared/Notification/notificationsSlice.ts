import { createSlice, bindActionCreators, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { NotificationState } from './types'

const initialState: NotificationState = {
  messages: [],
  type: null,
}

const notificationSlice = createSlice({
  name: 'notificationState',
  initialState,
  reducers: {
    addMessage: (state: NotificationState, { payload }: PayloadAction<NotificationState>) => {
      state.messages = payload.messages
      state.type = payload.type
    },
    clearMessages: (state: NotificationState) => {
      state.messages = []
      state.type = null
    },
  },
})

export const { addMessage } = notificationSlice.actions

export const useDispatchNotification = () => {
  const { actions } = notificationSlice
  const dispatch = useDispatch()

  return bindActionCreators(actions, dispatch)
}

export const useSelectNotification = () => useSelector((state: RootState) => state.notificationState)

export default notificationSlice.reducer
