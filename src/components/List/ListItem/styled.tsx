import styled from 'styled-components'

export const StyledItem = styled.li`
  margin: 0px;
  align-self: center;
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'a b'
    'a c';
`

export enum Position {
  image = 'a',
  primary = 'b',
  secondary = 'c',
}

type ItemElementProps = {
  position: Position
}

export const StyledItemElement = styled.span<ItemElementProps>`
  grid-area: ${({ position }) => position};
`
