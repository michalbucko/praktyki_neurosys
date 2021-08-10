import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Input, InputColor, InputSize, InputVariant } from './Input'

const onChange = jest.fn()

describe('Input', () => {
  test('exists', () => {
    render(<Input value="test" onChange={onChange} />)
    const exists = screen.getByDisplayValue('test')
    expect(exists).toBeInTheDocument()
  })

  test('is standard variant', () => {
    render(
      <Input
        value="test"
        variant={InputVariant.standard}
        onChange={onChange}
        color={InputColor.secondary}
        sizef={InputSize.large}
      />
    )
    const input = screen.getByDisplayValue('test')
    expect(input).toHaveStyle('border: 1px solid grey;')
  })

  test('has large size', () => {
    render(
      <Input
        value="test"
        variant={InputVariant.standard}
        onChange={onChange}
        color={InputColor.secondary}
        sizef={InputSize.large}
      />
    )
    const input = screen.getByDisplayValue('test')
    const style = window.getComputedStyle(input)
    expect(style.fontSize).toBe(InputSize.large)
  })

  test('has secondary color', () => {
    render(
      <Input
        value="test"
        variant={InputVariant.standard}
        onChange={onChange}
        color={InputColor.secondary}
        sizef={InputSize.large}
      />
    )
    const input = screen.getByDisplayValue('test')
    const style = window.getComputedStyle(input)
    expect(style.color).toBe('blue')
  })

  test('has placeholder', () => {
    render(<Input value="" label="placeholder" onChange={onChange} color={InputColor.secondary} />)
    const placeholder = screen.getByPlaceholderText('placeholder')
    expect(placeholder).toBeVisible()
  })

  test('is not required', () => {
    render(<Input value="test" onChange={onChange} variant={InputVariant.filled} />)
    const notRequired = screen.getByDisplayValue('test')
    expect(notRequired).not.toBeRequired()
  })

  test('is disabled', () => {
    render(<Input value="test" onChange={onChange} disabled />)
    const disabled = screen.getByDisplayValue('test')
    expect(disabled).toBeDisabled()
  })
})
