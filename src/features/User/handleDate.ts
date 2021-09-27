import { format } from 'date-fns'
import { dateFormat } from 'utils/dateFormat'

export const handleDate = (input: Date | string) => (input instanceof Date ? format(input, dateFormat) : input)

export const handleDateOptional = (input: Date | string | undefined | null) => (input ? handleDate(input) : undefined)
