import { put, takeLatest } from 'redux-saga/effects'
import {
  addUser,
  editUser,
  fetchUsers,
  fetchUsersFail,
  fetchUsersSuccess,
  fetchUserToEdit,
  fetchUserToEditSuccess,
  fetchUserToEditFail,
  removeUser,
} from 'features/User/usersSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { addMessage } from 'shared/Notification/notificationsSlice'
import { NotificationType } from 'shared/Notification/types'
import { getErrorMessage } from 'utils/getMessage'
import { TablePaginationPropsTypes } from 'utils/types/types'
import { AddUser, EditUser } from './types'
import { deleteUser, getUserById, getUsers, patchUser, postUser } from './api'

function* workerFetchUsers(action: PayloadAction<TablePaginationPropsTypes>) {
  try {
    const { data } = yield getUsers(action)
    yield put(fetchUsersSuccess(data))
  } catch (e) {
    yield put(fetchUsersFail())
  }
}

function* workerFetchUserToEdit(action: PayloadAction<string>) {
  try {
    const { data } = yield getUserById(action)
    yield put(fetchUserToEditSuccess(data))
  } catch {
    yield put(fetchUserToEditFail())
  }
}

function* workerRemoveUser(action: PayloadAction<number>) {
  try {
    yield deleteUser(action)
    yield put(
      addMessage({
        messages: ['Successfully delete user'],
        type: NotificationType.success,
      })
    )
    yield put(
      fetchUsers({
        page: 1,
        pageSize: 10,
      })
    )
  } catch (e) {
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerAddUser(action: PayloadAction<AddUser>) {
  try {
    yield postUser(action)
    yield put(
      addMessage({
        messages: ['Successfully added new user'],
        type: NotificationType.success,
      })
    )
    yield action.payload.onSuccess()
  } catch (e) {
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
    if (action.payload.onFail) yield action.payload.onFail()
  }
}

function* workerEditUser(action: PayloadAction<EditUser>) {
  try {
    yield patchUser(action)
    yield put(
      addMessage({
        messages: ['Successfully updated user'],
        type: NotificationType.success,
      })
    )
    yield action.payload.onSuccess()
  } catch (e) {
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
    if (action.payload.onFail) yield action.payload.onFail()
  }
}

export function* userSaga() {
  yield takeLatest(fetchUsers, workerFetchUsers)
  yield takeLatest(fetchUserToEdit, workerFetchUserToEdit)
  yield takeLatest(removeUser, workerRemoveUser)
  yield takeLatest(addUser, workerAddUser)
  yield takeLatest(editUser, workerEditUser)
}
