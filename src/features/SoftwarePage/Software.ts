export type Software = {
  id: string
  company: string
  name: string
  category: string
  expDate?: Date | null
  amount?: string
}

export type SoftwareState = {
  softwares: Software[]
}
