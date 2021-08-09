import { InputVariant, InputColor, InputSize, getVariant, getColor, Props } from 'components/Input/Input'
import { FC } from 'react'
import styled from 'styled-components'

type StyledInput = {
  variant?: InputVariant
  color?: InputColor
  sizef?: InputSize
  error?: boolean
}

export const StyledInputWrapper = styled.div<StyledInput>`
  color: ${(props) => getColor(props)};
  font-size: ${({ sizef }) => sizef};
  width: 250px;
  height: 75px;
  ${(props) => getVariant(props)}
`

export const InputWrapper: FC<Props> = ({ children, name, helperText, ...rest }) => (
  <StyledInputWrapper {...rest}>
    <div>{name}</div>
    {children}
    <div>{helperText}</div>
  </StyledInputWrapper>
)
