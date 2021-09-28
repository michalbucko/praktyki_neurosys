import { PayloadAction } from '@reduxjs/toolkit'
import { push } from 'connected-react-router'
import { User } from 'features/User/types'
import { takeLatest, put } from 'redux-saga/effects'
import { addMessage } from 'shared/Notification/notificationsSlice'
import { NotificationType } from 'shared/Notification/types'
import { getErrorMessage } from 'utils/getMessage'
import { getToken, setAuth } from 'utils/getToken'
import { setAccessToken, removeAccessToken, getAccessToken } from 'utils/setAccessToken'
import { AuthType } from './AuthType'
import { logFailure, logIn, logOut, logPending, logSuccess } from './LoginSlice'

function* workerGetToken(payload: PayloadAction<AuthType>) {
  try {
    const { data } = yield getToken(payload)
    yield setAccessToken(data.access_token)
    yield put(logPending())
  } catch (e) {
    yield put(logFailure())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerSetAuthLogin() {
  try {
    if (getAccessToken()) {
      const { data }: { data: User } = yield setAuth()
      yield put(logSuccess(data))
      yield put(push(`/dashboard`))
    }
    // else {
    //   yield put(logOut())
    // }
  } catch (e) {
    yield put(logFailure())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerLogOut() {
  try {
    if (!getAccessToken()) {
      yield put(push(`/login`))
      yield put(
        addMessage({
          messages: ['Token expired'],
          type: NotificationType.error,
        })
      )
    } else {
      yield removeAccessToken()
      yield put(push(`/login`))
      yield put(
        addMessage({
          messages: ['Logged out successfully'],
          type: NotificationType.success,
        })
      )
    }
  } catch (e) {
    yield put(push(`/login`))
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

export function* loginSaga() {
  yield takeLatest(logIn, workerGetToken)
  yield takeLatest(logPending, workerSetAuthLogin)
  yield takeLatest(logOut, workerLogOut)
}
