import { useState } from 'react'
import { HorizontalSplit } from 'components/HorizontalSplit/HorizontalSplit'
import { AddEditSoftware } from './components/AddEditSoftware'
import { SoftwareList } from './components/SoftwareList'

export type Soft = {
  id: number
  company: string
  name: string
  category: string
  expDate?: Date | string
  amount?: number
}

export const SoftwarePage = () => {
  const [software, setSoftware] = useState<Soft[]>([])
  const [lastIndex, setLastIndex] = useState(0)

  const onRemove = (softId: number) => {
    setSoftware((state) => state.filter((soft) => soft.id !== softId))
  }

  const onSave = (values: Omit<Soft, 'id'>) => {
    setSoftware((state) => {
      return [
        ...state,
        {
          id: lastIndex + 1,
          ...values,
        },
      ]
    })
    setLastIndex((state) => state + 1)
  }
  return (
    <HorizontalSplit
      leftSide={<AddEditSoftware onSave={onSave} />}
      rightSide={<SoftwareList softwares={software} onRemove={onRemove} />}
    />
  )
}
