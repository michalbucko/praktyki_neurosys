import { InputVariant, InputColor, InputSize, getVariant, getColor, Props } from 'components/Input/Input'
import { FC } from 'react'
import styled, { css } from 'styled-components'

type StyledInput = {
  variant?: InputVariant
  name?: JSX.Element
  helperText?: JSX.Element
  color?: InputColor
  sizef?: InputSize
  disabled?: boolean
  error?: boolean
}

const getVariantName = ({ variant, disabled, error }: StyledInput) => {
  switch (variant) {
    case InputVariant.standard:
      if (disabled) {
        return css`
          margin-left: 7px;
          padding: 4px;
          color: grey;
          background-color: white;
          opacity: 60%;
        `
      }
      if (error) {
        return css`
          margin-left: 7px;
          padding: 4px;
          color: red;
          background-color: white;
        `
      }
      return css`
        margin-left: 7px;
        padding: 4px;
        color: grey;
        background-color: white;
      `
    case InputVariant.filled:
      if (disabled) {
        return css`
          margin-left: 6px;
          margin-top: 9px;
          padding: 4px;
          color: grey;
          opacity: 60%;
        `
      }
      if (error) {
        return css`
          margin-left: 6px;
          margin-top: 9px;
          padding: 4px;
          color: red;
        `
      }
      return css`
        margin-left: 6px;
        margin-top: 9px;
        padding: 4px;
        color: grey;
      `
    case InputVariant.outlined:
      if (disabled) {
        return css`
          padding-top: 14px;
          margin-bottom: 5px;
          color: grey;
          opacity: 60%;
        `
      }
      if (error) {
        return css`
          padding-top: 14px;
          margin-bottom: 5px;
          color: red;
        `
      }
      return css`
        padding-top: 14px;
        margin-bottom: 5px;
        color: grey;
      `
    default:
      return css``
  }
}

const getVariantHelper = ({ variant, disabled, error }: StyledInput) => {
  switch (variant) {
    case InputVariant.standard:
      if (disabled) {
        return css`
          opacity: 60%;
          margin-left: 6px;
          padding: 5px;
          color: grey;
        `
      }
      if (error) {
        return css`
          margin-left: 6px;
          color: red;
          padding: 5px;
        `
      }
      return css`
        margin-left: 6px;
        color: grey;
        padding: 5px;
      `
    case InputVariant.filled:
      if (disabled) {
        return css`
          margin-left: 6px;
          padding: 4px;
          color: grey;
          opacity: 60%;
        `
      }
      if (error) {
        return css`
          margin-left: 6px;
          padding: 4px;
          color: red;
        `
      }
      return css`
        margin-left: 6px;
        padding: 4px;
        color: grey;
      `
    case InputVariant.outlined:
      if (disabled) {
        return css`
          margin-top: 5px;
          color: grey;
          opacity: 60%;
        `
      }
      if (error) {
        return css`
          margin-top: 5px;
          color: red;
        `
      }
      return css`
        margin-top: 5px;
        color: grey;
      `
    default:
      return css``
  }
}

export const StyledInputWrapper = styled.div<StyledInput>`
  color: ${(props) => getColor(props)};
  font-size: ${({ sizef }) => sizef};
  width: 250px;
  height: 75px;
  ${(props) => getVariant(props)}
`

export const Name = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  ${getVariantName};
  position: absolute;
`
export const HelperText = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
  ${getVariantHelper};
  position: relative;
`

export const InputWrapper: FC<Props> = ({ children, name, helperText, variant, disabled, error, ...rest }) => {
  return (
    <StyledInputWrapper {...rest}>
      <Name variant={variant} disabled={disabled} error={error}>
        {name}
      </Name>
      {children}
      <HelperText variant={variant} disabled={disabled} error={error}>
        {helperText}
      </HelperText>
    </StyledInputWrapper>
  )
}
