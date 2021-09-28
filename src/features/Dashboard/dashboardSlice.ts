import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stats } from 'features/Dashboard/api'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'
import { RootState } from 'store/store'
import { GenericFeatureStateTypeWithSingleElement } from 'utils/types/types'
import { dashboardSaga } from './dashboardSaga'

type DashboardSlice = {
  stats: GenericFeatureStateTypeWithSingleElement<Stats>
}

const initialState: DashboardSlice = {
  stats: { data: null, isLoading: false },
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchStats: (state) => {
      state.stats.isLoading = true
    },
    fetchStatsSuccess: (state, { payload }: PayloadAction<Stats>) => {
      state.stats = { isLoading: false, data: payload }
    },
    fetchStatsFail: (state) => {
      state.stats = { data: null, isLoading: false }
    },
  },
})

export const { fetchStatsSuccess, fetchStatsFail, fetchStats } = dashboardSlice.actions

export const useDispatchDashboard = () => {
  const { actions, name } = dashboardSlice
  const dispatch = useDispatch()
  useInjectSaga({ key: name, saga: dashboardSaga })

  return bindActionCreators(actions, dispatch)
}
export const useSelectDashboard = () => useSelector((state: RootState): DashboardSlice => state.dashboardState)

export default dashboardSlice.reducer
