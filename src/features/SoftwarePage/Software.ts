export type Software = {
  id: string
  company: string
  name: string
  category: string
  expDate?: string
  amount?: string
}

export type SoftwareState = {
  softwares: Software[]
}
