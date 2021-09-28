import { combineReducers } from '@reduxjs/toolkit'
import hardwareState from 'features/HardwarePage/hardwareSlice'
import softwareState from 'features/SoftwarePage/SoftwareSlice'
import usersState from 'features/User/usersSlice'
import loginState from 'features/LoginPage/LoginSlice'
import historyState from '../features/OperationHistoryTable/historySlice'
import locationState from '../shared/location/locationSlice'
import notificationState from '../shared/Notification/notificationsSlice'

export const getReducer = () =>
  combineReducers({
    softwareState,
    hardwareState,
    usersState,
    historyState,
    loginState,
    locationState,
    notificationState,
  })
