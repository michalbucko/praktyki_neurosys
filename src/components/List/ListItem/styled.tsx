import styled from "styled-components";

type ItemProps = {
   divider?: boolean
};

export const StyledItem = styled.li<ItemProps>`
   border-bottom: ${({ divider }) => divider && '1px solid #cccc'};
   padding-bottom: ${({ divider }) => divider && "10px"};
   margin: 0px;
   align-self: center;
   display: grid;
   gap: 10px;
   grid-template-columns: auto 1fr;
   grid-template-areas:
   "a b"
   "a c"
`;

export enum Position {
   image = "a",
   primary = "b",
   secondary = "c",
}

type ItemElementProps = {
   position: Position
}

export const StyledItemElement = styled.span<ItemElementProps>`
   grid-area: ${({ position }) => position}
`;