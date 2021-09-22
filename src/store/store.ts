import { configureStore, ThunkAction, Action, applyMiddleware } from '@reduxjs/toolkit'
import { createInjectorsEnhancer } from 'redux-injectors'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { getReducer } from './reducers'

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()

const injectorsEnhancer = createInjectorsEnhancer({
  createReducer: getReducer,
  runSaga: sagaMiddleware.run,
})

const enhancers = [injectorsEnhancer]
if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_LOGGER === 'true') {
  enhancers.push(applyMiddleware(logger))
}

export const store = configureStore({
  reducer: getReducer(),
  middleware: [thunk, sagaMiddleware],
  enhancers: [...enhancers, injectorsEnhancer],
  devTools: process.env.REACT_APP_LOGGER === 'true',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
