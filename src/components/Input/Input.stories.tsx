import { boolean, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Input, InputColor, InputSize, InputVariant, Props } from 'components/Input/Input'

storiesOf('Atoms', module).add('Input', () => {
  const props: Props = {
    value: text('text', ''),
    variant: select('variant', InputVariant, InputVariant.filled),
    color: select('color', InputColor, InputColor.primary),
    helperText: text('helperText', 'Helper text'),
    error: boolean('error', false),
    label: text('label', 'Input placeholder'),
    name: text('name', 'Input name'),
    required: boolean('required', false),
    disabled: boolean('disabled', false),
    sizef: select('size', Object.values(InputSize), InputSize.medium),
    onChange: (event) => console.log(event.target.value),
  }

  return <Input {...props} />
})
