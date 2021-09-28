import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { useInjectSaga } from 'redux-injectors'
import { GenericFeatureStateTypeWithMultipleElements } from 'utils/types/types'
import { Software, SoftwareState, SoftwareCategory } from './types'
import { SoftwareSaga } from './SoftwareSaga'

const initialState: SoftwareState = {
  softwares: {
    data: [],
    meta: null,
    links: '',
    isLoading: false,
  },
  software: {
    data: null,
    isLoading: false,
  },
  softwareCategory: {
    data: [],
    meta: null,
    links: '',
    isLoading: false,
  },
}

export const softwareSlice = createSlice({
  initialState,
  name: 'softwareSlice',
  reducers: {
    // fetch softwares
    fetchSoftwares: (state: SoftwareState, { payload }) => {
      state.softwares.isLoading = true
    },
    fetchSoftwaresSuccess: (
      state: SoftwareState,
      { payload }: PayloadAction<GenericFeatureStateTypeWithMultipleElements<Software>>
    ) => {
      state.softwares.data = payload.data
      state.softwares.meta = payload.meta
      state.softwares.links = payload.links
      state.softwares.isLoading = false
    },
    fetchSoftwaresError: (state: SoftwareState) => {
      state.softwares.isLoading = false
    },

    // fetch software
    fetchSoftware: (state: SoftwareState, { payload }: PayloadAction<string>) => {
      state.software.isLoading = true
    },
    fetchSoftwareSuccess: (state: SoftwareState, { payload }: PayloadAction<Software>) => {
      state.software.data = payload
      state.software.isLoading = false
    },
    fetchSoftwareError: (state: SoftwareState) => {
      state.software.isLoading = false
    },

    // remove software
    deleteSoftware: (state: SoftwareState, { payload }: PayloadAction<number>) => {
      state.softwares.isLoading = true
    },
    deleteSoftwareError: (state: SoftwareState) => {
      state.softwares.isLoading = false
    },

    // add software
    postSoftware: (state: SoftwareState, { payload }) => {
      state.softwares.isLoading = true
    },
    postSoftwareError: (state: SoftwareState) => {
      state.softwares.isLoading = false
    },

    // edit software
    patchSoftware: (state: SoftwareState, { payload }) => {
      state.software.isLoading = true
    },
    patchSoftwareError: (state: SoftwareState) => {
      state.software.isLoading = false
    },

    // software category
    fetchSoftwareCategory: (state: SoftwareState) => {
      state.softwareCategory.isLoading = true
    },
    fetchSoftwareCategorySuccess: (state: SoftwareState, { payload }: PayloadAction<SoftwareCategory[]>) => {
      state.softwareCategory.data = payload
      state.softwareCategory.isLoading = false
    },
    fetchSoftwareCategoryError: (state: SoftwareState) => {
      state.softwareCategory.isLoading = false
    },

    postSoftwareCategory: (state: SoftwareState, { payload }) => {
      state.softwareCategory.isLoading = true
    },
    postSoftwareCategoryError: (state: SoftwareState) => {
      state.softwareCategory.isLoading = false
    },

    deleteSoftwareCategory: (state: SoftwareState, { payload }) => {
      state.softwareCategory.isLoading = true
    },
    deleteSoftwareCategoryError: (state: SoftwareState) => {
      state.softwareCategory.isLoading = false
    },

    patchSoftwareCategory: (state: SoftwareState, { payload }) => {
      state.softwareCategory.isLoading = true
    },
    patchSoftwareCategoryError: (state: SoftwareState) => {
      state.softwareCategory.isLoading = false
    },
  },
})

export const {
  fetchSoftwares,
  fetchSoftwaresSuccess,
  fetchSoftwaresError,
  fetchSoftware,
  fetchSoftwareSuccess,
  fetchSoftwareError,
  deleteSoftware,
  deleteSoftwareError,
  postSoftware,
  postSoftwareError,
  patchSoftware,
  patchSoftwareError,
  fetchSoftwareCategory,
  fetchSoftwareCategorySuccess,
  fetchSoftwareCategoryError,
  postSoftwareCategory,
  postSoftwareCategoryError,
  deleteSoftwareCategory,
  deleteSoftwareCategoryError,
  patchSoftwareCategory,
  patchSoftwareCategoryError,
} = softwareSlice.actions

export const useDispatchSoftware = () => {
  const { actions, name } = softwareSlice
  const dispatch = useDispatch()
  useInjectSaga({ key: name, saga: SoftwareSaga })
  return bindActionCreators(actions, dispatch)
}

export const useSelectSoftware = () => useSelector((state: RootState) => state.softwareState)

export default softwareSlice.reducer
