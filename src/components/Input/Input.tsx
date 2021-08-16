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

export const getVariant = ({ variant, error }: StyleProps) => {
  switch (variant) {
    case InputVariant.standard:
      if (error) {
        return css`
          border: 1px solid grey;
          border-color: red;
          border-radius: 6px;
          padding: 10px;
          padding-top: 12px;
          padding-bottom: 7px;
          &:disabled {
            color: grey;
            opacity: 60%;
          }
        `
      }
      return css`
        border: 1px solid grey;
        border-radius: 6px;
        padding: 10px;
        padding-top: 12px;
        padding-bottom: 7px;
        &:disabled {
          color: grey;
          opacity: 60%;
        }
      `
    case InputVariant.filled:
      if (error) {
        return css`
          background-color: rgba(255, 0, 0, 0.1);
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid red;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          padding-top: 20px;
          padding-left: 10px;
          padding-bottom: 5px;
          &:disabled {
            color: grey;
            opacity: 60%;
            border-bottom: 1.5px grey dotted;
          }
        `
      }
      return css`
        background-color: rgba(192, 192, 192, 0.4);
        border-bottom: 1px solid black;
        border-top: none;
        border-left: none;
        border-right: none;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        padding-top: 20px;
        padding-left: 10px;
        padding-bottom: 5px;
        &:disabled {
          color: grey;
          opacity: 60%;
          border-bottom: 1.5px grey dotted;
        }
      `
    case InputVariant.outlined:
      if (error) {
        return css`
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid black;
          border-color: red;
          padding-left: 0px;
          padding-top: 20px;
          padding-bottom: 5px;
          &:disabled {
            color: grey;
            opacity: 60%;
            border-bottom: 1px grey dotted;
          }
        `
      }
      return css`
        border-bottom: 1px solid black;
        border-top: none;
        border-left: none;
        border-right: none;
        padding-left: 0px;
        padding-top: 20px;
        padding-bottom: 5px;
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
  width: 150px;
  position: relatives;
  margin-top: 9px;
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
  type?: string
}

export const Input = ({
  value,
  onChange,
  color,
  sizef = InputSize.medium,
  name,
  helperText,
  variant,
  label,
  type,
  disabled,
  error,
  required,
}: Props) => {
  return (
    <InputWrapper
      value={value}
      onChange={onChange}
      name={name}
      helperText={helperText}
      variant={variant}
      disabled={disabled}
      error={error}
    >
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
