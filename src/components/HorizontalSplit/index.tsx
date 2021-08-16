import React from 'react'
import { Wrapper, Element } from './styled'

type Props = {
  leftSide: JSX.Element
  rightSide: JSX.Element
}

export const HorizontalSplit = ({ leftSide, rightSide }: Props) => (
  <Wrapper>
    <Element>{leftSide}</Element>
    <Element>{rightSide}</Element>
  </Wrapper>
)
