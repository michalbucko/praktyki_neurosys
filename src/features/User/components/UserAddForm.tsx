import styled from 'styled-components'
import { useState } from 'react'
import Button, { ButtonSize, ButtonVariant } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import { User } from 'features/User/UserPage'

export type FormValues = Omit<User, 'id'>

type Props = {
  onSave: (data: FormValues) => void
}

export const UserAddForm = ({ onSave }: Props) => {
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    role: '',
    location: '',
    position: '',
    email: '',
    password: '',
    beginDate: '',
    endDate: '',
  }
  const [values, setValues] = useState<FormValues>(initialValues)

  const onChange = (name: keyof FormValues, value: string) => {
    setValues((state) => ({
      ...state,
      [name]: value,
    }))
  }

  const resetForm = () => setValues(initialValues)

  const onSubmit = () => {
    onSave(values)
    resetForm()
  }

  const dateStringUndefined = (data: Date | string | undefined) => {
    switch (typeof data) {
      case 'string':
        return data
      case 'object':
        return data.toLocaleDateString()
      default:
        return ''
    }
  }

  return (
    <FormWrapper>
      <Input label="First name" value={values.firstName} onChange={(e) => onChange('firstName', e.target.value)} />
      <Input label="Last name" value={values.lastName} onChange={(e) => onChange('lastName', e.target.value)} />
      <Input label="Role" value={values.role} onChange={(e) => onChange('role', e.target.value)} />
      <Input label="Location" value={values.location} onChange={(e) => onChange('location', e.target.value)} />
      <Input label="Position" value={values.position} onChange={(e) => onChange('position', e.target.value)} />
      <Input label="E-mail" value={values.email} onChange={(e) => onChange('email', e.target.value)} />
      <Input
        label="*Password"
        value={values.password === undefined ? '' : values.password}
        onChange={(e) => onChange('password', e.target.value)}
      />
      <Input
        label="*Begin date"
        value={dateStringUndefined(values.beginDate)}
        onChange={(e) => onChange('beginDate', e.target.value)}
      />
      <Input
        label="*End date"
        value={dateStringUndefined(values.endDate)}
        onChange={(e) => onChange('endDate', e.target.value)}
      />

      <ButtonsWrapper>
        <Button size={ButtonSize.small} variant={ButtonVariant.outlined} onClick={resetForm}>
          Reset
        </Button>
        <Button size={ButtonSize.small} variant={ButtonVariant.outlined} onClick={onSubmit}>
          Add
        </Button>
      </ButtonsWrapper>
    </FormWrapper>
  )
}

const FormWrapper = styled.div`
  padding: 20px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`

export default UserAddForm
