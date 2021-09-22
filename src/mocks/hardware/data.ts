type DeviceBackend = {
  id: string
  type: string
  brand: string
  model: string
  serialNumber: string
  location: string
  startDate: string
  endDate: string
}

export const devices: DeviceBackend[] = [
  {
    id: '0',
    type: 'Monitor',
    brand: 'Dell',
    model: 'UGGR4543',
    serialNumber: '23434-234345-45345-234234',
    location: 'Biaystok',
    startDate: '2021-04-02',
    endDate: '2021-04-02',
  },
  {
    id: '1',
    type: 'Laptop',
    brand: 'Asus',
    model: '35432',
    serialNumber: '45234-2345-6768-24g4',
    location: 'Wrocaw',
    startDate: '2020-06-02',
    endDate: '2020-06-03',
  },
]
