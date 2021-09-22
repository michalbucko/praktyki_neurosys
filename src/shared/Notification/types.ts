export enum NotificationType {
  success = 'success',
  error = 'error',
}

export type Message = string

export type NotificationState = {
  messages: Message[]
  type: NotificationType | null
}
