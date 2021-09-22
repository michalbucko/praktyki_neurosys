import * as yup from 'yup'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { AddCircle, Save } from '@material-ui/icons'
import { Button, Box, TextField } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import { getTextFieldParams } from 'utils/getTextFieldParams'
import { Location } from '../../../../shared/location/types'
import { useSelectHardware, useDispatchDevices } from '../../hardwareSlice'
import { FormValues, DeviceBrand } from '../../types'
import { toList } from '../../routes'
import { toHardwarePage } from '../../../../routes/routes'
import { useSelectLocation } from '../../../../shared/location/locationSlice'

export const HardwareForm = () => {
  const { postDevice, patchDevice } = useDispatchDevices()
  const { devicesBrands, device } = useSelectHardware()
  const { locations } = useSelectLocation()
  const { id } = useParams<{ id: string }>()
  const { push } = useHistory()

  const initialState: FormValues = {
    type: '',
    brand: 0,
    model: '',
    serialNumber: '',
    location: 0,
  }

  const getInitialState = () => {
    if (device.data && id) {
      const deviceToEditFormValues = {
        type: device?.data.type,
        brand: device?.data.brand?.id,
        model: device?.data.model,
        serialNumber: device?.data.serialNumber,
        location: device?.data.location?.id,
      }
      return deviceToEditFormValues
    }
    return initialState
  }

  const validationSchema = yup.object({
    type: yup.string().required('Type required'),
    brand: yup.number().min(1, 'Brand is required'),
    model: yup.string().required('Model required'),
    serialNumber: yup.string().required('Serial number required'),
    location: yup.number().min(1, 'City is required'),
  })

  const { values, isSubmitting, handleSubmit, handleReset, getFieldProps, getFieldMeta, getFieldHelpers } = useFormik({
    initialValues: getInitialState(),
    onSubmit: (formData, { resetForm, setSubmitting }) => {
      if (id) {
        patchDevice({
          device: {
            id,
            data: formData,
          },
          onSuccess: () => {
            push(`${toHardwarePage}${toList}`)
            resetForm()
          },
          onFail: () => {
            setSubmitting(false)
          },
        })
      } else {
        postDevice({
          device: formData,
          onSuccess: () => {
            push(`${toHardwarePage}${toList}`)
            resetForm()
          },
          onFail: () => {
            setSubmitting(false)
          },
        })
      }
    },
    validationSchema,
    enableReinitialize: true,
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box display="grid" gridRowGap={16}>
          <TextField
            variant="outlined"
            size="medium"
            label="Type"
            {...getTextFieldParams('type', getFieldMeta, getFieldProps)}
          />
          <TextField
            id="brand"
            variant="outlined"
            size="medium"
            label="Brand"
            select
            SelectProps={{
              native: true,
            }}
            {...getTextFieldParams('brand', getFieldMeta, getFieldProps)}
            onChange={(e) => getFieldHelpers('brand').setValue(+e.target.value)}
          >
            {values.brand === 0 && (
              <option value={0} hidden>
                Pick brand
              </option>
            )}
            {devicesBrands.data.map((brand: DeviceBrand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            size="medium"
            label="Model"
            {...getTextFieldParams('model', getFieldMeta, getFieldProps)}
          />
          <TextField
            variant="outlined"
            size="medium"
            label="Serial Number"
            {...getTextFieldParams('serialNumber', getFieldMeta, getFieldProps)}
          />
          <TextField
            variant="outlined"
            size="medium"
            label="Location"
            select
            SelectProps={{
              native: true,
            }}
            {...getTextFieldParams('location', getFieldMeta, getFieldProps)}
            onChange={(e) => getFieldHelpers('location').setValue(+e.target.value)}
          >
            {values.location === 0 && (
              <option value={0} hidden>
                Pick city
              </option>
            )}
            {locations.data.map((location: Location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </TextField>
        </Box>
        <Box display="grid" gridAutoFlow="column" gridColumnGap={10} justifyContent="end" mt={2}>
          <Button
            disabled={isSubmitting}
            type="button"
            startIcon={<ReplayIcon />}
            variant="contained"
            color="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            startIcon={id ? <Save /> : <AddCircle />}
            variant="contained"
            color="primary"
          >
            {id ? 'Save' : 'Add'}
          </Button>
        </Box>
      </form>
    </>
  )
}
