import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'

enum Status {
  success = 'success',
  error = 'error',
  loading = 'loading',
}

export type Operation = {
  orderingPerson: string
  recivingPerson: string
  operationDescription: string
  operationDate: string
  id: string
}

type HistoryState = {
  operations: Operation[]
  status: Status
}

const initialState: HistoryState = {
  operations: [],
  status: Status.loading,
}

const historySlice = createSlice({
  name: 'historyState',
  initialState,
  reducers: {
    getHistorySuccess: (state: HistoryState, { payload: history }: PayloadAction<Operation[]>) => ({
      ...state,
      operations: history,
      status: Status.success,
    }),
    getHistoryError: (state: HistoryState) => ({
      ...state,
      status: Status.error,
    }),
  },
})

export const useSelectHistory = () => useSelector((state: RootState): HistoryState => state.historyState)

export const useDispatchHistory = () => {
  const dispatch = useDispatch()
  const { actions } = historySlice
  return bindActionCreators(actions, dispatch)
}

export default historySlice.reducer
