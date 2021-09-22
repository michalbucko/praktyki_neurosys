import { PayloadAction } from '@reduxjs/toolkit'
import { takeLatest, put } from 'redux-saga/effects'
import { addMessage } from 'shared/Notification/notificationsSlice'
import { NotificationType } from 'shared/Notification/types'
import { getErrorMessage } from 'utils/getMessage'
import {
  DeleteDeviceBrandPayloadProp,
  deleteDeviceBrandRequest,
  deleteDeviceRequest,
  getDevice,
  getDevices,
  getDevicesBrands,
  GetDevicesPayloadProp,
  PatchDeviceBrandPayloadProp,
  patchDeviceBrandRequest,
  PatchDevicePayloadProps,
  patchDeviceRequest,
  PostDeviceBrandPayloadProp,
  postDeviceBrandRequest,
  PostDevicePayloadProp,
  postDeviceRequest,
} from './api'
import {
  fetchDevice,
  fetchDeviceError,
  fetchDevices,
  fetchDevicesBrands,
  fetchDevicesBrandsError,
  fetchDevicesBrandsSuccess,
  fetchDevicesError,
  fetchDevicesSuccess,
  fetchDeviceSuccess,
  postDeviceError,
  postDevice,
  deleteDevice,
  deleteDeviceError,
  patchDevice,
  postDeviceBrand,
  postDeviceBrandError,
  deleteDeviceBrandErrorr,
  deleteDeviceBrand,
  patchDeviceBrand,
  patchDeviceBrandError,
  patchDeviceError,
} from './hardwareSlice'

function* workerFetchDevices(action: PayloadAction<GetDevicesPayloadProp>) {
  try {
    const { data } = yield getDevices(action)
    yield put(fetchDevicesSuccess(data))
  } catch (e) {
    yield put(fetchDevicesError())
  }
}

function* workerFetchDevice(action: PayloadAction<string>) {
  try {
    const { data } = yield getDevice(action)
    yield put(fetchDeviceSuccess(data))
  } catch (e) {
    yield put(fetchDeviceError())
  }
}

function* workerPostDevice(action: PayloadAction<PostDevicePayloadProp>) {
  try {
    yield postDeviceRequest(action)
    yield action.payload.onSuccess()
    yield put(
      addMessage({
        messages: ['Successfully added new device'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(postDeviceError())
    if (action.payload.onFail) {
      yield action.payload.onFail()
    }
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerDeleteDevice(action: PayloadAction<number>) {
  try {
    yield deleteDeviceRequest(action)
    yield put(
      fetchDevices({
        page: 1,
        pageSize: 10,
      })
    )
    yield put(
      addMessage({
        messages: ['Successfully delete device'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(deleteDeviceError())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerPatchDevice(action: PayloadAction<PatchDevicePayloadProps>) {
  try {
    yield patchDeviceRequest(action)
    yield action.payload.onSuccess()
    yield put(
      addMessage({
        messages: ['Successfully updated device'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(patchDeviceError())
    if (action.payload.onFail) {
      yield action.payload.onFail()
    }
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerFetchDevicesBrands() {
  try {
    const { data } = yield getDevicesBrands()
    yield put(fetchDevicesBrandsSuccess(data))
  } catch (e) {
    yield put(fetchDevicesBrandsError())
  }
}

function* workerPostDeviceBrand(action: PayloadAction<PostDeviceBrandPayloadProp>) {
  try {
    yield postDeviceBrandRequest(action)
    yield action.payload.onSuccess()
    yield put(fetchDevicesBrands())
    yield put(
      addMessage({
        messages: ['Successfully added new device brand'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(postDeviceBrandError())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerDeleteDeviceBrand(action: PayloadAction<DeleteDeviceBrandPayloadProp>) {
  try {
    yield deleteDeviceBrandRequest(action)
    yield action.payload.onSuccess()
    yield put(fetchDevicesBrands())
    yield put(
      addMessage({
        messages: ['Successfully removed device brand'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(deleteDeviceBrandErrorr())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerPatchDeviceBrand(action: PayloadAction<PatchDeviceBrandPayloadProp>) {
  try {
    yield patchDeviceBrandRequest(action)
    yield action.payload.onSuccess()
    yield put(fetchDevicesBrands())
    yield put(
      addMessage({
        messages: ['Successfully updated device brand'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(patchDeviceBrandError())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

export function* DevicesSaga() {
  yield takeLatest(fetchDevices, workerFetchDevices)
  yield takeLatest(fetchDevice, workerFetchDevice)
  yield takeLatest(postDevice, workerPostDevice)
  yield takeLatest(deleteDevice, workerDeleteDevice)
  yield takeLatest(patchDevice, workerPatchDevice)
  yield takeLatest(fetchDevicesBrands, workerFetchDevicesBrands)
  yield takeLatest(postDeviceBrand, workerPostDeviceBrand)
  yield takeLatest(deleteDeviceBrand, workerDeleteDeviceBrand)
  yield takeLatest(patchDeviceBrand, workerPatchDeviceBrand)
}
