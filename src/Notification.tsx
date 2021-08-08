import { NotificationWrapper } from 'NotificationWrapper'

export enum NotificationBackground {
  primary = 'primary',
  secondary = 'secondary',
  error = 'error',
}

export enum NotificationSize {
  small = '10px',
  medium = '20px',
  large = '30px',
}

type Props = {
  text: string
  background: NotificationBackground
  color: string
  border?: boolean
  size?: NotificationSize
}

export const Notification = ({ text, size = NotificationSize.medium, ...rest }: Props) => {
  return (
    <NotificationWrapper size={size} {...rest}>
      <div>{text}</div>
    </NotificationWrapper>
  )
}
