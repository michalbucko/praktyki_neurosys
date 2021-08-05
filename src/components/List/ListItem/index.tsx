import React from "react";
import { Position, StyledItem, StyledItemElement } from "./styled";

type Props = {
   primaryText: string;
   secondaryText: string;
   image: JSX.Element
   divider?: boolean
}

export const ListItem = ({ primaryText, secondaryText, image, divider }: Props): JSX.Element => {

   return (
      <StyledItem divider={divider}>
         <StyledItemElement position={Position.image}>{image}</StyledItemElement>
         <StyledItemElement position={Position.primary}>{primaryText}</StyledItemElement>
         <StyledItemElement position={Position.secondary}>{secondaryText}</StyledItemElement>
      </StyledItem>
   )
}