import React from 'react'
import { Position, StyledItem, StyledItemElement } from './styled'

type Props = {
  primaryText: string
  secondaryText: string
  image?: JSX.Element
}

export const ListItem = ({ primaryText, secondaryText, image }: Props): JSX.Element => {
  return (
    <StyledItem>
      <StyledItemElement data-testid="image" position={Position.image}>
        {image}
      </StyledItemElement>
      <StyledItemElement data-testid="primaryText" position={Position.primary}>
        {primaryText}
      </StyledItemElement>
      <StyledItemElement data-testid="secondaryText" position={Position.secondary}>
        {secondaryText}
      </StyledItemElement>
    </StyledItem>
  )
}
