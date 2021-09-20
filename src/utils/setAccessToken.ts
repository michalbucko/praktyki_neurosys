export const setAccessToken = (item: string) => {
  localStorage.setItem('token', item)
}

export const removeAccessToken = () => {
  localStorage.removeItem('token')
}

export const getAccessToken = () => {
  return localStorage.getItem('token')
}
