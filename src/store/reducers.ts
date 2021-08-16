import { combineReducers } from '@reduxjs/toolkit'
import { softwareSlice } from 'features/SoftwarePage/slice'

export const getReducer = () => combineReducers({ softwarestate: softwareSlice.reducer })
