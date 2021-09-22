import { nanoid } from '@reduxjs/toolkit'
import { Operation } from 'features/OperationHistoryTable/historySlice'

export type OperationBackend = Omit<Operation, 'operationDate'> & {
  operationDate: Date
}

const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (start.getTime() - end.getTime()))
}

export const operationHistory: OperationBackend[] = [
  {
    id: nanoid(),
    orderingPerson: 'Jan Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Laptop rent',
    operationDate: randomDate(new Date(2020, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Kacper Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Laptop rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Michał Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Laptop rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Wiesław Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Laptop rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Rościsław Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Laptop rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Paweł Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Laptop rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Przemysław Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Laptop rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Toamsz Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Laptop rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Adam Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Laptop rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Adrian Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Laptop rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Dawid Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Monitor rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Michał Nowak',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Monitor rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Sebastian Kowalski',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Monitor rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Anna Kowalski',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Monitor rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Patryrcja Kowalski',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Monitor rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Samanta Kowalski',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Monitor rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Małgorzata Kowalski',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Mouse rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Katarzyna Kowalski',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Mouse rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Paulina Kowalski',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Mouse rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Sandra Kowalski',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Mouse rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Dorota Kowalski',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Mouse rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
  {
    id: nanoid(),
    orderingPerson: 'Danuta Kowalski',
    recivingPerson: 'Jacek Kowalski',
    operationDescription: 'Mouse rent',
    operationDate: randomDate(new Date(2019, 0, 1), new Date()),
  },
]
