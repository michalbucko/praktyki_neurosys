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
  const childrenWithOptionalProps = () => {
    if (!Array.isArray(children)) {
      return children
    }
    return children.map((child, index) => {
      if (children.length - 1 === index) {
        return React.cloneElement(child, { key: child.key })
      }
      return React.cloneElement(child, { divider, key: child.key })
    })
  }

  return (
    <StyledList border={border}>
      {header && <StyledHeader>{header}</StyledHeader>}
      {subheader && <StyledSubHeader>{subheader}</StyledSubHeader>}
      {childrenWithOptionalProps()}
    </StyledList>
  )
}
