import styled from 'styled-components'

type ListProps = {
  border?: boolean
  divider?: boolean
}

export const StyledList = styled.ul<ListProps>`
  list-style-type: none;
  padding-left: 0px;
  box-shadow: ${({ border }) => border && '2px 2px 5px 2px #C9C9C9;'};
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;

  li {
    border-bottom: ${({ divider }) => divider && '1px solid #cccc'};
    padding-bottom: ${({ divider }) => divider && '10px'};
  }
  li:last-child {
    border-bottom: none;
    padding-bottom: 0px;
  }
`

export const StyledHeader = styled.h2`
  margin: 0px;
`

export const StyledSubHeader = styled.h3`
  margin: 0px;
  font-size: 1.15rem;
`
