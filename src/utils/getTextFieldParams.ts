import { FieldInputProps, FieldMetaProps } from 'formik'
import { isEmpty } from 'ramda'

export const getTextFieldParams = (
  name: string,
  getFieldMeta: (name: string) => FieldMetaProps<unknown>,
  getFieldProps?: (nameOrOptions: unknown) => FieldInputProps<unknown>
) => {
  const { touched, error } = getFieldMeta(name)
  const props = getFieldProps ? getFieldProps(name) : {}
  return {
    ...props,
    error: (isEmpty(error) || !!error) && touched,
    helperText: touched && error && error,
    fullWidth: true,
  }
}
