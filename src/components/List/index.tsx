import React from 'react'
import { StyledHeader, StyledList, StyledSubHeader } from './styled'

type Props = {
  children: JSX.Element | JSX.Element[]
  header?: string
  subheader?: string
  divider?: boolean
  border?: boolean
}

export const List = ({ children, header, subheader, divider, border }: Props): JSX.Element => {
  return (
    <StyledList border={border} divider={divider}>
      {header && <StyledHeader data-testid="header">{header}</StyledHeader>}
      {subheader && <StyledSubHeader data-testid="subheader">{subheader}</StyledSubHeader>}
      {children}
    </StyledList>
  )
}
