import { put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { addMessage } from 'shared/Notification/notificationsSlice'
import { NotificationType } from 'shared/Notification/types'
import { TablePaginationPropsTypes } from 'utils/types/types'
import { getErrorMessage } from 'utils/getMessage'
import {
  getSoftwareById,
  PostSoftwarePayloadProp,
  deleteSoftwareRequest,
  patchSoftwareRequest,
  PatchSoftwarePayloadProps,
  getSoftwareCategory,
  PostSoftwareCategoryPayloadProp,
  postSoftwareCategoryRequest,
  deleteSoftwareCategoryRequest,
  DeleteSoftwareCategoryPayloadProp,
  PatchSoftwareCategoryPayloadProp,
  patchSoftwareCategoryRequest,
  postSoftwareRequest,
  getSoftware,
} from './api'
import {
  deleteSoftware,
  deleteSoftwareCategory,
  deleteSoftwareCategoryError,
  deleteSoftwareError,
  fetchSoftware,
  fetchSoftwareSuccess,
  fetchSoftwareError,
  fetchSoftwaresError,
  fetchSoftwareCategory,
  fetchSoftwareCategoryError,
  fetchSoftwareCategorySuccess,
  fetchSoftwares,
  fetchSoftwaresSuccess,
  patchSoftware,
  patchSoftwareCategory,
  patchSoftwareCategoryError,
  patchSoftwareError,
  postSoftware,
  postSoftwareCategory,
  postSoftwareCategoryError,
  postSoftwareError,
} from './SoftwareSlice'

function* workerFetchSoftwares(action: PayloadAction<TablePaginationPropsTypes>) {
  try {
    const { data } = yield getSoftware(action)
    yield put(fetchSoftwaresSuccess(data))
  } catch {
    yield put(fetchSoftwaresError())
  }
}

function* workerFetchSoftware(action: PayloadAction<string>) {
  try {
    const { data } = yield getSoftwareById(action)
    yield put(fetchSoftwareSuccess(data))
  } catch {
    yield put(fetchSoftwareError())
  }
}

function* workerPostSoftware(action: PayloadAction<PostSoftwarePayloadProp>) {
  try {
    yield postSoftwareRequest(action)
    yield action.payload.onSuccess()
    yield put(
      addMessage({
        messages: ['Successfully added new software'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(postSoftwareError())
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

function* workerDeleteSoftware(action: PayloadAction<number>) {
  try {
    yield deleteSoftwareRequest(action)
    yield put(
      fetchSoftwares({
        page: 1,
        pageSize: 10,
      })
    )
    yield put(
      addMessage({
        messages: ['Successfully delete software'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(deleteSoftwareError())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerPatchSoftware(action: PayloadAction<PatchSoftwarePayloadProps>) {
  try {
    yield patchSoftwareRequest(action)
    yield action.payload.onSuccess()
    yield put(
      addMessage({
        messages: ['Successfully updated software'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(patchSoftwareError())
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

function* workerFetchSoftwareCategory() {
  try {
    const { data } = yield getSoftwareCategory()
    yield put(fetchSoftwareCategorySuccess(data))
  } catch (e) {
    yield put(fetchSoftwareCategoryError())
  }
}

function* workerPostSoftwareCategory(action: PayloadAction<PostSoftwareCategoryPayloadProp>) {
  try {
    yield postSoftwareCategoryRequest(action)
    yield action.payload.onSuccess()
    yield put(fetchSoftwareCategory())
    yield put(
      addMessage({
        messages: ['Successfully added new software category'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(postSoftwareCategoryError())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerDeleteSoftwareCategory(action: PayloadAction<DeleteSoftwareCategoryPayloadProp>) {
  try {
    yield deleteSoftwareCategoryRequest(action)
    yield action.payload.onSuccess()
    yield put(fetchSoftwareCategory())
    yield put(
      addMessage({
        messages: ['Successfully removed software category'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(deleteSoftwareCategoryError())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

function* workerPatchSoftwareCategory(action: PayloadAction<PatchSoftwareCategoryPayloadProp>) {
  try {
    yield patchSoftwareCategoryRequest(action)
    yield action.payload.onSuccess()
    yield put(fetchSoftwareCategory())
    yield put(
      addMessage({
        messages: ['Successfully updated software category'],
        type: NotificationType.success,
      })
    )
  } catch (e) {
    yield put(patchSoftwareCategoryError())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

export function* SoftwareSaga() {
  yield takeLatest(fetchSoftwares, workerFetchSoftwares)
  yield takeLatest(fetchSoftware, workerFetchSoftware)
  yield takeLatest(postSoftware, workerPostSoftware)
  yield takeLatest(deleteSoftware, workerDeleteSoftware)
  yield takeLatest(patchSoftware, workerPatchSoftware)
  yield takeLatest(fetchSoftwareCategory, workerFetchSoftwareCategory)
  yield takeLatest(postSoftwareCategory, workerPostSoftwareCategory)
  yield takeLatest(deleteSoftwareCategory, workerDeleteSoftwareCategory)
  yield takeLatest(patchSoftwareCategory, workerPatchSoftwareCategory)
}
