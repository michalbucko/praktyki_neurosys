import { NotificationBackground, NotificationSize } from 'Notification'
import { ReactElement } from 'react'
import styled from 'styled-components'

type StyledProps = {
  background: NotificationBackground
  color: string
  border?: boolean
  size?: NotificationSize
}
const getColor = ({ background, ...rest }: StyledProps) => {
  console.log('rest', rest)
  switch (background) {
    case NotificationBackground.primary:
      return 'blue'
    case NotificationBackground.secondary:
      return 'pink'
    case NotificationBackground.error:
      return 'red'
    default:
      return 'white'
  }
}

const StyledNotificationWrapper = styled.div`
  background: ${getColor};
  color: ${({ color }: StyledProps) => color};
  border: ${({ border }) => (border ? '10px solid black' : 'none')};
  font-size: ${({ size }: StyledProps) => size};
  position: relative;
  height: 200px;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`

type Props = {
  children: ReactElement
  background: NotificationBackground
  color: string
  border?: boolean
  size?: NotificationSize
}

export const NotificationWrapper = ({ children, ...rest }: Props) => {
  return (
    <StyledNotificationWrapper {...rest}>
      {children}
      Notification
    </StyledNotificationWrapper>
  )
}
