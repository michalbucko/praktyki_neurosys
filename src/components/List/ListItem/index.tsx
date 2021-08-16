import React from 'react'
import { Position, StyledItem, StyledItemElement } from './styled'

type Props = {
  primaryText: string
  secondaryText: string
  image?: JSX.Element
  Buttons?: JSX.Element
}

export const ListItem = ({ primaryText, secondaryText, image, Buttons }: Props): JSX.Element => {
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
      <StyledItemElement position={Position.button}>{Buttons && Buttons}</StyledItemElement>
    </StyledItem>
  )
}
