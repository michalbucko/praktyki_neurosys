import { ChangeEvent } from 'react'
import styled, { css } from 'styled-components'
import { InputWrapper } from 'components/Input/InputWrapper'

export enum InputVariant {
  filled = 'filled',
  outlined = 'outlined',
  standard = 'standard',
}

export enum InputColor {
  primary = 'primary',
  secondary = 'secondary',
  error = 'error',
}

export enum InputSize {
  small = '10px',
  medium = '15px',
  large = '20px',
}

export const getVariant = ({ variant }: StyleProps) => {
  switch (variant) {
    case InputVariant.standard:
      return css`
        border: 1px solid grey;
        height: 50px;
        border-radius: 5px;
        &:disabled {
          color: grey;
          opacity: 60%;
        }
      `
    case InputVariant.filled:
      return css`
        background-color: rgba(192, 192, 192, 0.4);
        border-bottom: 1px solid black;
        border-top: none;
        border-left: none;
        border-right: none;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        height: 50px;
        &:disabled {
          color: grey;
          opacity: 60%;
          border-bottom: 1px grey dotted;
        }
      `
    case InputVariant.outlined:
      return css`
        border-bottom: 1px solid black;
        border-top: none;
        border-left: none;
        border-right: none;
        height: 50px;
        &:disabled {
          color: grey;
          opacity: 60%;
          border-bottom: 1px grey dotted;
        }
      `
    default:
      return css``
  }
}

export const getColor = ({ color, error }: StyleProps) => {
  if (error) {
    return 'red'
  }

  switch (color) {
    case InputColor.primary:
      return 'black'
    case InputColor.secondary:
      return 'blue'
    case InputColor.error:
      return 'red'
    default:
      return 'black'
  }
}

const StyledInput = styled.input<StyleProps>`
  color: ${(props) => getColor(props)};
  font-size: ${({ sizef }) => sizef};
  width: 250px;
  height: 50px;
  ${getVariant}
`

type StyleProps = {
  variant?: InputVariant
  color?: InputColor
  error?: boolean
  sizef?: InputSize
}

export type Props = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  variant?: InputVariant
  color?: InputColor
  helperText?: string
  error?: boolean
  label?: string
  name?: string
  required?: boolean
  disabled?: boolean
  sizef?: InputSize
}

export const Input = ({
  value,
  onChange,
  color,
  sizef = InputSize.medium,
  variant,
  label,
  disabled,
  error,
  required,
}: Props) => {
  return (
    <InputWrapper value={value} onChange={onChange}>
      <StyledInput
        type=""
        value={value}
        onChange={onChange}
        color={color}
        sizef={sizef}
        variant={variant}
        placeholder={label}
        required={required}
        disabled={disabled}
        error={error}
      />
    </InputWrapper>
  )
}
