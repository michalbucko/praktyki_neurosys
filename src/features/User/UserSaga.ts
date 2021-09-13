import { put, takeLatest } from 'redux-saga/effects'
import {
  addUser,
  editUser,
  fetchLocation,
  fetchLocationFail,
  fetchLocationSuccess,
  fetchUsers,
  fetchUsersFail,
  fetchUsersSuccess,
  fetchUserToEdit,
  fetchUserToEditSuccess,
  fetchUserToEditFail,
  removeUser,
  removeUserSuccess,
  addUserSuccess,
  addUserFail,
  editUserSuccess,
  editUserFail,
  removeUserFail,
} from 'features/User/usersSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { deleteUser, getLocation, getUserById, getUsers, patchUser, postUser } from './api'
import { PayloadActionAddUser, PayloadActionEditUser } from './types'

function* workerFetchUsers() {
  try {
    const { data } = yield getUsers()
    yield put(fetchUsersSuccess(data))
  } catch {
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
    yield put(removeUserSuccess())
    yield put(fetchUsers())
  } catch {
    yield put(removeUserFail())
  }
}

function* workerAddUser(action: PayloadActionAddUser) {
  try {
    yield postUser(action)
    yield put(addUserSuccess())
    yield action.payload.onSuccess()
  } catch {
    yield put(addUserFail())
  }
}

function* workerEditUser(action: PayloadActionEditUser) {
  try {
    yield patchUser(action)
    yield put(editUserSuccess())
    yield action.payload.onSuccess()
  } catch {
    yield put(editUserFail())
  }
}

function* workerFetchLocation() {
  try {
    const { data } = yield getLocation()
    yield put(fetchLocationSuccess(data))
  } catch {
    yield put(fetchLocationFail())
  }
}

export function* userSaga() {
  yield takeLatest(fetchUsers, workerFetchUsers)
  yield takeLatest(fetchUserToEdit, workerFetchUserToEdit)
  yield takeLatest(removeUser, workerRemoveUser)
  yield takeLatest(addUser, workerAddUser)
  yield takeLatest(editUser, workerEditUser)
  yield takeLatest(fetchLocation, workerFetchLocation)
}
