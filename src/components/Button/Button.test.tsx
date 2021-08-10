import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button, { ButtonVariant } from './Button'

describe('Button', () => {
  test('Render', () => {
    render(<Button>Button</Button>)
    const button = screen.getByText('Button')

    expect(button).toBeInTheDocument()
  })

  test('Text uppercase', () => {
    render(<Button variant={ButtonVariant.outlined}>Button</Button>)
    const button = screen.getByText('Button')

    expect(button).toHaveStyle(`text-transform: uppercase`)
  })

  test('Not full width', () => {
    render(<Button>Button</Button>)
    const button = screen.getByText('Button')

    expect(button).not.toHaveStyle(`width: 100%`)
  })

  test('Full width', () => {
    render(<Button fullWidth>Button</Button>)
    const button = screen.getByText('Button')

    expect(button).toHaveStyle(`width: 100%`)
  })

  test('Not disabled', () => {
    render(<Button>Button</Button>)
    const button = screen.getByText('Button')

    expect(button).not.toBeDisabled()
  })

  test('Disabled', () => {
    render(<Button disabled>Button</Button>)
    const button = screen.getByText('Button')

    expect(button).toBeDisabled()
  })

  test('Variant text', () => {
    render(<Button variant={ButtonVariant.text}>Button</Button>)
    const button = screen.getByText('Button')

    expect(button).toHaveStyle({
      background: 'none',
      border: 'none',
    })
  })

  test('Variant outlined', () => {
    render(<Button variant={ButtonVariant.outlined}>Button</Button>)
    const button = screen.getByText('Button')
    const style = window.getComputedStyle(button)

    expect(style.border).toBeDefined()
    expect(style.border).not.toBe('none')
    expect(style.background).toBe('none')
  })

  test('Variant contained', () => {
    render(<Button variant={ButtonVariant.contained}>Button</Button>)
    const button = screen.getByText('Button')
    const style = window.getComputedStyle(button)

    expect(style.background).toBeDefined()
    expect(style.background).not.toBe('none')
  })

  const onClick = jest.fn()
  test('Click', () => {
    render(<Button onClick={onClick}>Button</Button>)
    const button = screen.getByText('Button')

    expect(onClick).not.toBeCalled()
    userEvent.click(button)
    expect(onClick).toBeCalled()
  })
})
