/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from 'react-router-dom'
import { useDispatchSoftware, useSelectSoftware } from 'features/SoftwarePage/SoftwareSlice'
import { toList } from 'features/SoftwarePage/routes'
import { toSoftwarePage } from 'routes/routes'
import ReplayIcon from '@material-ui/icons/Replay'
import { useParams } from 'react-router'
import { Box, TextField, Button } from '@material-ui/core'
import { AddCircle, Save } from '@material-ui/icons'
import { DatePicker } from '@material-ui/pickers'
import { dateFormat } from 'utils/dateFormat'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { getTextFieldParams } from 'utils/getTextFieldParams'
import { FormValues, SoftwareCategory } from '../../types'

export const SoftwareForm = () => {
  const { id } = useParams<{ id?: string }>()
  const { software, softwareCategory } = useSelectSoftware()
  const { push } = useHistory()
  const { postSoftware, patchSoftware } = useDispatchSoftware()

  const initialValues: FormValues = {
    company: '',
    name: '',
    category: 0,
    expDate: undefined,
    numberOfUses: 0,
  }

  const getInitialState = () => {
    if (software.data && id) {
      const softwareToEditFormValues = {
        name: software?.data.name,
        company: software?.data.company,
        category: software?.data.category?.id,
        expDate: software?.data.expDate,
        numberOfUses: software?.data.numberOfUses,
      }
      return softwareToEditFormValues
    }
    return initialValues
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
    company: Yup.string().required('Company required'),
    category: Yup.string().required('Category required'),
  })

  const {
    values,
    isSubmitting,
    handleSubmit,
    handleReset,
    getFieldProps,
    getFieldMeta,
    getFieldHelpers,
    setFieldValue,
  } = useFormik({
    initialValues: getInitialState(),
    onSubmit: (formData, { resetForm, setSubmitting }) => {
      if (id) {
        patchSoftware({
          software: {
            id,
            data: formData,
          },
          onSuccess: () => {
            push(`${toSoftwarePage}${toList}`)
            resetForm()
          },
          onFail: () => {
            setSubmitting(false)
          },
        })
      } else {
        postSoftware({
          software: formData,
          onSuccess: () => {
            push(`${toSoftwarePage}${toList}`)
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
            label="Company name"
            type="company"
            {...getTextFieldParams('company', getFieldMeta, getFieldProps)}
          />
          <TextField
            variant="outlined"
            label="Licence name"
            type="name"
            {...getTextFieldParams('name', getFieldMeta, getFieldProps)}
          />
          <TextField
            id="category"
            variant="outlined"
            size="medium"
            label="Category"
            select
            SelectProps={{
              native: true,
            }}
            {...getTextFieldParams('category', getFieldMeta, getFieldProps)}
            onChange={(e) => getFieldHelpers('category').setValue(+e.target.value)}
          >
            {values.category === 0 && (
              <option value={0} hidden>
                Pick category
              </option>
            )}
            {softwareCategory.data.map((category: SoftwareCategory) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </TextField>
          <DatePicker
            inputVariant="outlined"
            label="Expire date"
            format={dateFormat}
            type="expDate"
            {...getTextFieldParams('expDate', getFieldMeta, getFieldProps)}
            value={values.expDate}
            onChange={(date) => setFieldValue('expDate', date)}
          />
          <TextField
            variant="outlined"
            label="Number of devices"
            type="numberOfUses"
            {...getTextFieldParams('numberOfUses', getFieldMeta, getFieldProps)}
            value={values.numberOfUses}
            onChange={(e) => getFieldHelpers('numberOfUses').setValue(+e.target.value)}
          />
        </Box>

        <Box display="grid" gridAutoFlow="column" gridColumnGap={10} justifyContent="end" mt={2}>
          <Button
            disabled={isSubmitting}
            color="secondary"
            variant="contained"
            startIcon={<ReplayIcon />}
            onClick={handleReset}
            disableElevation
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={software ? <Save /> : <AddCircle />}
            type="submit"
            disableElevation
          >
            {software ? 'Save' : 'Add'}
          </Button>
        </Box>
      </form>
    </>
  )
}
