import { useState } from 'react'
import { Input, InputVariant } from 'components/Input/Input'
import { useHistory } from 'react-router-dom'
import Button, { ButtonColor, ButtonVariant, ButtonSize } from 'components/Button/Button'
import { useDispatchSoftware, useSelectSoftware } from 'features/SoftwarePage/slice'
import { toList } from 'features/SoftwarePage/routes'
import { toSoftwarePage } from 'routes/routes'
import { useParams } from 'react-router'
import { nanoid } from '@reduxjs/toolkit'
import { Software } from '../Software'

type FormValues = Omit<Software, 'id'>

type SoftwareParams = {
  id?: string
}

export const AddEditSoftware = () => {
  const initialValues: FormValues = {
    company: '',
    name: '',
    category: '',
    expDate: '',
    amount: '',
  }

  const { softwares } = useSelectSoftware()
  const { addSoftware, editSoftware } = useDispatchSoftware()

  const { push } = useHistory()
  const params = useParams<SoftwareParams>()

  const [softwareToEdit] = softwares.filter((software) => software.id === params.id)

  const getInitialValues = () => {
    if (softwareToEdit) {
      const { id, ...rest } = softwareToEdit
      return rest
    }
    return initialValues
  }

  const [values, setValues] = useState<FormValues>(getInitialValues)

  const onChange = (name: keyof FormValues, value: string) => {
    setValues((state) => ({
      ...state,
      [name]: value,
    }))
  }

  const resetForm = () => setValues(initialValues)

  const onSubmit = () => {
    if (softwareToEdit) {
      const { id } = softwareToEdit
      editSoftware({
        id,
        ...values,
      })
    } else {
      addSoftware({
        id: nanoid(),
        ...values,
      })
    }
    push(`${toSoftwarePage}${toList}`)
    resetForm()
  }

  return (
    <div>
      <p>{softwareToEdit ? 'Edit Licence' : 'Add new Licence'}</p>
      <Input
        value={values.company}
        variant={InputVariant.standard}
        name="Company name *"
        helperText="Manufacturer"
        onChange={(event) => onChange('company', event.target.value)}
        label="Enter company name"
      />
      <Input
        value={values.name}
        variant={InputVariant.standard}
        name="Licence name *"
        helperText="Software name"
        onChange={(event) => onChange('name', event.target.value)}
        label="Enter licence name"
      />
      <Input
        value={values.category}
        variant={InputVariant.standard}
        name="Category *"
        helperText="Category of licence"
        onChange={(event) => onChange('category', event.target.value)}
        label="Enter category"
      />
      <Input
        value={values.expDate === undefined ? '' : values.expDate}
        variant={InputVariant.standard}
        name="Expire date *"
        helperText="Date that licence will expire"
        onChange={(event) => onChange('expDate', event.target.value)}
        label="Enter expire date"
      />
      <Input
        value={values.amount === undefined ? '' : values.amount}
        variant={InputVariant.standard}
        name="Number of devices *"
        type="number"
        onChange={(event) => onChange('amount', event.target.value)}
        label="Enter number"
      />
      <Button size={ButtonSize.small} variant={ButtonVariant.outlined} color={ButtonColor.primary} onClick={onSubmit}>
        {softwareToEdit ? 'Edit' : 'Add'}
      </Button>
      <br />
      <br />
      <Button
        size={ButtonSize.small}
        variant={ButtonVariant.outlined}
        color={ButtonColor.secondary}
        onClick={resetForm}
      >
        Reset
      </Button>
    </div>
  )
}
