import React from 'react'
import styled from 'styled-components'

type Props = {
  leftSide: JSX.Element
  rightSide: JSX.Element
}

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 21% 25%;
  gap: 45%;
`
export const Element = styled.div`
  padding: 20px;
  margin-left: 50px;
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid grey;
`

export const Element2 = styled.div`
  padding: 20px;
  background-color: rgba(192, 192, 192, 0.2);
  border: 1px solid grey;
  border-radius: 10px;
  margin-top: 20px;
  margin-right: 20px;
`
export const HorizontalSplit = ({ leftSide, rightSide }: Props) => (
  <Wrapper>
    <Element>{leftSide}</Element>
    <Element2>{rightSide}</Element2>
  </Wrapper>
)
