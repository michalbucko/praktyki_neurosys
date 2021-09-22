import { createSlice, bindActionCreators, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'
import { RootState } from 'store/store'
import { locationSaga } from './locationSaga'
import { LocationState, Location } from './types'

const initialState: LocationState = {
  locations: {
    data: [],
    isLoading: true,
  },
}

const locationSlice = createSlice({
  name: 'locationState',
  initialState,
  reducers: {
    fetchLocation: (state: LocationState) => {
      state.locations.isLoading = true
    },
    fetchLocationSuccess: (state: LocationState, { payload }: PayloadAction<Location[]>) => {
      state.locations.data = payload
      state.locations.isLoading = false
    },
    fetchLocationError: (state: LocationState) => {
      state.locations.isLoading = false
    },
    postLocation: (state: LocationState, { payload }) => {
      state.locations.isLoading = true
    },
    postLocationError: (state: LocationState) => {
      state.locations.isLoading = false
    },
    patchLocation: (state: LocationState, { payload }) => {
      state.locations.isLoading = true
    },
    patchLocationError: (state: LocationState) => {
      state.locations.isLoading = false
    },
    deleteLocation: (state: LocationState, { payload }) => {
      state.locations.isLoading = true
    },
    deleteLocationError: (state: LocationState) => {
      state.locations.isLoading = false
    },
  },
})

export const {
  fetchLocation,
  fetchLocationSuccess,
  fetchLocationError,
  postLocation,
  postLocationError,
  patchLocation,
  patchLocationError,
  deleteLocation,
  deleteLocationError,
} = locationSlice.actions

export const useDispatchLocation = () => {
  const { actions, name } = locationSlice
  const dispatch = useDispatch()
  useInjectSaga({ key: name, saga: locationSaga })

  return bindActionCreators(actions, dispatch)
}

export const useSelectLocation = () => useSelector((state: RootState) => state.locationState)

export default locationSlice.reducer
