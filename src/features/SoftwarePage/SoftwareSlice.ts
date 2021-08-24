import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { Software, SoftwareState } from './Software'

const initialState: SoftwareState = {
  softwares: [],
}

export const softwareSlice = createSlice({
  initialState,
  name: 'software',
  reducers: {
    addSoftware: (state, { payload }: PayloadAction<Software>) => {
      state.softwares = [...state.softwares, payload]
    },
    removeSoftware: (state, { payload }: PayloadAction<string>) => {
      state.softwares = state.softwares.filter((software) => software.id !== payload)
    },
    editSoftware: (state: SoftwareState, { payload: editedSoftware }: PayloadAction<Software>) => ({
      ...state,
      softwares: state.softwares.map((software: Software) =>
        editedSoftware.id === software.id ? { ...editedSoftware } : { ...software }
      ),
    }),
  },
})

export const useDispatchSoftware = () => {
  const { actions } = softwareSlice
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}

export const useSelectSoftware = () => useSelector((state: RootState): SoftwareState => state.softwarestate)

export default softwareSlice.reducer
