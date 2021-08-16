import { useState } from 'react'
import { Input, InputVariant } from 'components/Input/Input'
import Button, { ButtonColor, ButtonVariant, ButtonSize } from 'components/Button/Button'
import { Soft } from 'features/SoftwarePage/SoftwarePage'

type FormValues = {
  company: string
  name: string
  category: string
  expDate: Date | string
  amount: number
}

type Props = {
  onSave: (data: Omit<Soft, 'id'>) => void
}

export const AddEditSoftware = ({ onSave }: Props) => {
  const initialValues: FormValues = {
    company: '',
    name: '',
    category: '',
    expDate: '2017-05-24',
    amount: 0,
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

  return (
    <div>
      <p>Add new Licence</p>
      <Input
        value={values.company}
        variant={InputVariant.outlined}
        name="Company name *"
        helperText="Manufacturer"
        onChange={(event) => onChange('company', event.target.value)}
        label="Enter company name"
      />
      <Input
        value={values.name}
        variant={InputVariant.outlined}
        name="Licence name *"
        helperText="Software name"
        onChange={(event) => onChange('name', event.target.value)}
        label="Enter licence name"
      />
      <Input
        value={values.category}
        variant={InputVariant.outlined}
        name="Category *"
        helperText="Category of licence"
        onChange={(event) => onChange('category', event.target.value)}
        label="Enter category"
      />
      <Input
        value={values.expDate.toString()}
        variant={InputVariant.outlined}
        name="Expire date *"
        helperText="Date that licence will expire"
        onChange={(event) => onChange('expDate', event.target.value)}
      />
      <Input
        value={values.amount.toString()}
        variant={InputVariant.outlined}
        name="Number of devices *"
        type="number"
        onChange={(event) => onChange('amount', event.target.value)}
      />
      <Button size={ButtonSize.small} variant={ButtonVariant.outlined} color={ButtonColor.primary} onClick={onSubmit}>
        Save
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
