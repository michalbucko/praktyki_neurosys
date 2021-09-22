import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'
import { GenericFeatureStateTypeWithMultipleElements } from 'utils/types/types'
import { RootState } from 'store/store'
import { DevicesSaga } from './HardwareSaga'
import { Device, DeviceBrand, HardwareState } from './types'

const initialState: HardwareState = {
  devices: {
    data: [],
    meta: null,
    links: '',
    isLoading: true,
  },
  devicesBrands: {
    data: [],
    meta: null,
    links: '',
    isLoading: true,
  },
  device: {
    data: null,
    isLoading: true,
  },
}

const hardwareSlice = createSlice({
  name: 'hardwareState',
  initialState,
  reducers: {
    fetchDevices: (state: HardwareState, { payload }) => {
      state.devices.isLoading = true
    },
    fetchDevicesSuccess: (
      state: HardwareState,
      { payload }: PayloadAction<GenericFeatureStateTypeWithMultipleElements<Device>>
    ) => {
      state.devices.data = payload.data
      state.devices.meta = payload.meta
      state.devices.links = payload.links
      state.devices.isLoading = false
    },
    fetchDevicesError: (state: HardwareState) => {
      state.devices.isLoading = false
    },
    postDevice: (state: HardwareState, { payload }) => {
      state.devices.isLoading = true
    },
    postDeviceError: (state: HardwareState) => {
      state.devices.isLoading = false
    },
    deleteDevice: (state: HardwareState, { payload }) => {
      state.devices.isLoading = true
    },
    deleteDeviceError: (state: HardwareState) => {
      state.devices.isLoading = false
    },
    patchDevice: (state: HardwareState, { payload }) => {
      state.devices.isLoading = true
    },
    patchDeviceError: (state: HardwareState) => {
      state.devices.isLoading = false
    },
    fetchDevice: (state: HardwareState, { payload }) => {
      state.device.isLoading = true
    },
    fetchDeviceSuccess: (state: HardwareState, { payload }: PayloadAction<Device>) => {
      state.device.data = payload
      state.device.isLoading = false
    },
    fetchDeviceError: (state: HardwareState) => {
      state.device.isLoading = false
    },
    fetchDevicesBrands: (state: HardwareState) => {
      state.devicesBrands.isLoading = true
    },
    fetchDevicesBrandsSuccess: (
      state: HardwareState,
      { payload }: PayloadAction<GenericFeatureStateTypeWithMultipleElements<DeviceBrand>>
    ) => {
      state.devicesBrands.data = payload.data
      state.devicesBrands.meta = payload.meta
      state.devicesBrands.links = payload.links
      state.devicesBrands.isLoading = false
    },
    fetchDevicesBrandsError: (state: HardwareState) => {
      state.devicesBrands.isLoading = false
    },
    postDeviceBrand: (state: HardwareState, { payload }) => {
      state.devicesBrands.isLoading = true
    },
    postDeviceBrandError: (state: HardwareState) => {
      state.devicesBrands.isLoading = false
    },
    deleteDeviceBrand: (state: HardwareState, { payload }) => {
      state.devicesBrands.isLoading = true
    },
    deleteDeviceBrandErrorr: (state: HardwareState) => {
      state.devicesBrands.isLoading = false
    },
    patchDeviceBrand: (state: HardwareState, { payload }) => {
      state.devicesBrands.isLoading = true
    },
    patchDeviceBrandError: (state: HardwareState) => {
      state.devicesBrands.isLoading = false
    },
  },
})

export const useDispatchDevices = () => {
  const { actions, name } = hardwareSlice
  const dispatch = useDispatch()
  useInjectSaga({ key: name, saga: DevicesSaga })

  return bindActionCreators(actions, dispatch)
}

export const {
  fetchDevices,
  fetchDevicesSuccess,
  fetchDevicesError,
  fetchDevice,
  fetchDeviceSuccess,
  fetchDeviceError,
  fetchDevicesBrands,
  fetchDevicesBrandsSuccess,
  fetchDevicesBrandsError,
  postDevice,
  postDeviceError,
  deleteDevice,
  deleteDeviceError,
  patchDevice,
  patchDeviceError,
  postDeviceBrand,
  postDeviceBrandError,
  deleteDeviceBrand,
  deleteDeviceBrandErrorr,
  patchDeviceBrand,
  patchDeviceBrandError,
} = hardwareSlice.actions

export const useSelectHardware = () => useSelector((state: RootState): HardwareState => state.hardwareState)

export default hardwareSlice.reducer
