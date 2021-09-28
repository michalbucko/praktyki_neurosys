import { getStats } from 'features/Dashboard/api'
import { fetchStats, fetchStatsFail, fetchStatsSuccess } from 'features/Dashboard/dashboardSlice'
import { put, takeLatest } from 'redux-saga/effects'
import { addMessage } from 'shared/Notification/notificationsSlice'
import { NotificationType } from 'shared/Notification/types'
import { getErrorMessage } from 'utils/getMessage'

function* workerFetchStats() {
  try {
    const { data } = yield getStats()
    yield put(fetchStatsSuccess(data))
  } catch (e) {
    yield put(fetchStatsFail())
    yield put(
      addMessage({
        messages: getErrorMessage(e.response.data.message),
        type: NotificationType.error,
      })
    )
  }
}

export function* dashboardSaga() {
  yield takeLatest(fetchStats, workerFetchStats)
}
