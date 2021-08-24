import { combineReducers } from '@reduxjs/toolkit'
import hardwareState from 'features/HardwarePage/hardwareSlice'
import { softwareSlice } from 'features/SoftwarePage/SoftwareSlice'
import usersState from 'features/User/usersSlice'

export const getReducer = () =>
  combineReducers({
    softwarestate: softwareSlice.reducer,
    hardwareState,
    usersState,
  })
