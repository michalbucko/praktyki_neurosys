export type Device = {
  id: string
  type: string
  brand: string
  model: string
  serialNumber: string
  location: string
}

export type DevicesState = {
  devices: Device[]
}
