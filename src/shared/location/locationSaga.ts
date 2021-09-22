import { put, takeLatest } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { addMessage } from 'shared/Notification/notificationsSlice'
import { NotificationType } from 'shared/Notification/types'
import {
  DeleteLocationPayloadProp,
  deleteLocationRequest,
  getLocations,
  PatchLocationPayloadProp,
  patchLocationRequest,
  PostLocationPayloadProp,
  postLocationRequest,
} from './api'
import {
  deleteLocation,
  fetchLocation,
  fetchLocationError,
  fetchLocationSuccess,
  patchLocation,
  postLocation,
} from './locationSlice'

function* workerFetchLocaiton() {
  try {
    const { data } = yield getLocations()
    yield put(fetchLocationSuccess(data))
  } catch {
    yield put(fetchLocationError())
  }
}

function* workerPostLocation(action: PayloadAction<PostLocationPayloadProp>) {
  try {
    yield postLocationRequest(action)
    yield action.payload.onSuccess()
    yield put(fetchLocation())
    yield put(
      addMessage({
        messages: ['Successfully added new location'],
        type: NotificationType.success,
      })
    )
  } catch {
    yield put(fetchLocationError())
    yield put(
      addMessage({
        messages: ['Failed to add new location'],
        type: NotificationType.error,
      })
    )
  }
}

function* workerDeleteLocation(action: PayloadAction<DeleteLocationPayloadProp>) {
  try {
    yield deleteLocationRequest(action)
    yield action.payload.onSuccess()
    yield put(fetchLocation())
    yield put(
      addMessage({
        messages: ['Successfully deleted location'],
        type: NotificationType.success,
      })
    )
  } catch {
    yield put(fetchLocationError())
    yield put(
      addMessage({
        messages: ['Failed to delete location'],
        type: NotificationType.error,
      })
    )
  }
}

function* workerPatchLocation(action: PayloadAction<PatchLocationPayloadProp>) {
  try {
    yield patchLocationRequest(action)
    yield action.payload.onSuccess()
    yield put(fetchLocation())
    yield put(
      addMessage({
        messages: ['Successfully updated location'],
        type: NotificationType.success,
      })
    )
  } catch {
    yield put(fetchLocationError())
    yield put(
      addMessage({
        messages: ['Failed to update location'],
        type: NotificationType.error,
      })
    )
  }
}

export function* locationSaga() {
  yield takeLatest(fetchLocation, workerFetchLocaiton)
  yield takeLatest(postLocation, workerPostLocation)
  yield takeLatest(deleteLocation, workerDeleteLocation)
  yield takeLatest(patchLocation, workerPatchLocation)
}
