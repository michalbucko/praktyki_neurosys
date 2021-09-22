export const getErrorMessage = (message: string | string[]) => (typeof message === 'string' ? [message] : message)
