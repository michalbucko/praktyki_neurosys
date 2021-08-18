import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { Device, DevicesState } from './device'

const initialState: DevicesState = {
  devices: [],
}

export const hardwareSlice = createSlice({
  name: 'hardwareState',
  initialState,
  reducers: {
    addDevice: (state: DevicesState, { payload: newDevice }: PayloadAction<Device>) => ({
      ...state,
      devices: [...state.devices, { ...newDevice }],
    }),
    deleteDevice: (state: DevicesState, { payload: id }: PayloadAction<string>) => ({
      ...state,
      devices: state.devices.filter((device: Device) => device.id !== id),
    }),
    editDevice: (state: DevicesState, { payload: editedDevice }: PayloadAction<Device>) => ({
      ...state,
      devices: state.devices.map((device: Device) =>
        editedDevice.id === device.id ? { ...editedDevice } : { ...device }
      ),
    }),
  },
})

export const useDispatchDevices = () => {
  const { actions } = hardwareSlice
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}

export const useSelectHardware = () => useSelector((state: RootState): DevicesState => state.hardwareState)

export default hardwareSlice.reducer
