export type Device = {
  id: string
  type: string
  brand: string
  model: string
  serialNumber: string
  location: string
  startDate: Date | null
  endDate: Date | null
}

export type DevicesState = {
  devices: Device[]
}
