import { rest } from 'msw'
import { format } from 'date-fns'
import { dateFormat } from 'utils/dateFormat'
import { OperationBackend, operationHistory } from './data'

export type OperationPropsString = keyof Omit<OperationBackend, 'operationDate'>

const sortOperations = (orderBy: string, orderDirection: string, operations: OperationBackend[]) => {
  if (orderDirection === 'desc') {
    return operations.sort((operation1: OperationBackend, operation2: OperationBackend) => {
      if (orderBy === 'operationDate') {
        return operation2[orderBy].getTime() - operation1[orderBy].getTime()
      }
      return operation2[orderBy as OperationPropsString].localeCompare(operation1[orderBy as OperationPropsString])
    })
  }
  return operations.sort((operation1: OperationBackend, operation2: OperationBackend) => {
    if (orderBy === 'operationDate') {
      return operation1[orderBy].getTime() - operation2[orderBy].getTime()
    }
    return operation1[orderBy as OperationPropsString].localeCompare(operation2[orderBy as OperationPropsString])
  })
}

export const handlers = [
  rest.get('/history', (req, res, ctx) => {
    const page = req.url.searchParams.get('page')
    const limit = req.url.searchParams.get('limit')
    const orderBy = req.url.searchParams.get('orderBy')
    const orderDirection = req.url.searchParams.get('orderDirection')
    const arrayOfFilters = req.url.search
      .split('&')
      .filter((urlFilter) => urlFilter.includes('filter'))
      .map((filterArrayItem) => filterArrayItem.split('='))

    if (page && limit) {
      if (arrayOfFilters.length) {
        const filteredOperations = operationHistory.filter((operation: OperationBackend) => {
          const { id, ...propsToFilterFrom } = operation
          const OperationsArray = Object.entries(propsToFilterFrom)
          return OperationsArray.every((operationItem) => {
            return arrayOfFilters.every((filterItem) => {
              if (filterItem[0].trim().toLowerCase().includes(operationItem[0].trim().toLowerCase())) {
                if (typeof operationItem[1] === 'string') {
                  return !!operationItem[1].trim().toLowerCase().includes(filterItem[1].trim().toLowerCase())
                }
                const date = format(operationItem[1], dateFormat)
                return !!date.trim().toLowerCase().includes(filterItem[1].trim().toLowerCase())
              }
              return true
            })
          })
        })
        orderBy && orderDirection && sortOperations(orderBy, orderDirection, filteredOperations)
        const operationsPage = filteredOperations.slice(+page * +limit, +page * +limit + +limit)
        return res(
          ctx.status(200),
          ctx.delay(200),
          ctx.json({ data: operationsPage, page: +page, total: filteredOperations.length })
        )
      }

      const operations = [...operationHistory]
      orderBy && orderDirection && sortOperations(orderBy, orderDirection, operations)
      const operationsPage = operations.slice(+page * +limit, +page * +limit + +limit)
      return res(
        ctx.status(200),
        ctx.delay(200),
        ctx.json({ data: operationsPage, page: +page, total: operations.length })
      )
    }

    return res(ctx.status(404), ctx.delay(200))
  }),
]
