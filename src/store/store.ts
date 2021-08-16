import { configureStore, ThunkAction, Action, applyMiddleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { getReducer } from './reducers'

const logger = createLogger()

const enhancers = []
if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_LOGGER === 'true') {
  enhancers.push(applyMiddleware(logger))
}

export const store = configureStore({
  reducer: getReducer(),
  middleware: [],
  enhancers,
  devTools: process.env.REACT_APP_LOGGER === 'true',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
