import { combineReducers } from '@reduxjs/toolkit'
import hardwareState from 'features/HardwarePage/hardwareSlice'
import { softwareSlice } from 'features/SoftwarePage/slice'

export const getReducer = () =>
  combineReducers({
    softwarestate: softwareSlice.reducer,
    hardwareState,
  })
