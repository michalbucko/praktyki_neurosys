import { select, boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import Button, { ButtonColor, ButtonSize, ButtonVariant } from './Button'

storiesOf('Atoms', module).add('Button', () => {
  const props = {
    variant: select('variant', ButtonVariant, ButtonVariant.text),
    color: select('color', ButtonColor, ButtonColor.primary),
    size: select('size', ButtonSize, ButtonSize.medium),
    disabled: boolean('disabled', false),
    fullWidth: boolean('fullWidth', false),
    children: text('tekst', 'button'),
  }

  return (
    <Button {...props} onClick={() => alert('click')}>
      {props.children}
    </Button>
  )
})
