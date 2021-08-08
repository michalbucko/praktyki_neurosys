import React from 'react'
import styled, { css } from 'styled-components'

export enum ButtonVariant {
  text = 'text',
  outlined = 'outlined',
  contained = 'contained',
}

export enum ButtonColor {
  primary = 'rgb(25, 118, 210)', // #1976d2
  secondary = 'rgb(156, 39, 193)', // #9c27c1
  error = 'rgb(211, 47, 47)', // #d32f2f
  success = 'rgb(46, 125, 50)', // #2e7d32
}

export enum ButtonSize {
  small = '.75rem',
  medium = '1rem',
  large = '1.25rem',
}

type Props = {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  fullWidth?: boolean
  children: string
}

type StyledProps = {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  fullWidth?: boolean
}

const getVariant = ({ variant, color }: StyledProps) => {
  switch (variant) {
    case ButtonVariant.text:
      return css`
        color: ${color};
        background: none;
        border: none;
        &:disabled {
          color: rgb(168, 175, 189);
        }
      `
    case ButtonVariant.outlined:
      return css`
        color: ${color};
        background: none;
        border: 1px solid ${color};
        &:disabled {
          color: rgb(168, 175, 189);
          border-color: rgb(224, 224, 224);
        }
      `
    case ButtonVariant.contained:
      return css`
        color: white;
        background-color: ${color};
        border: none;
        &:disabled {
          color: rgb(168, 175, 189);
          background-color: rgb(224, 224, 224);
        }
      `
    default:
      return css``
  }
}

const StyledButton = styled.button<StyledProps>`
  cursor: pointer;
  padding: 0.5em 1em;
  text-transform: uppercase;
  border-radius: 0.25em;
  letter-spacing: 1px;
  font-size: ${({ size }) => size};
  width: ${({ fullWidth }) => fullWidth && '100%'};

  ${getVariant}
`

const Button = ({
  variant = ButtonVariant.text,
  color = ButtonColor.primary,
  size = ButtonSize.medium,
  children,
  ...rest
}: Props) => {
  return (
    <StyledButton variant={variant} color={color} size={size} {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button
