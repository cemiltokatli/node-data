import Nullable from './Nullable'

/**
 * Provides methods to convert data to certain types.
 */
const DataConversion = {
  boolean: (data: any): Nullable<boolean> => {
    return (data as number) === 1
  },
  date: (data: any): Nullable<Date> => {
    return data as Date
  },
  enum: <T>(model: T, data: any): Nullable<T[keyof T]> => {
    const result = Object.keys(model as any).find(k => (model as any)[k] == data)

    return (model as any)[result as any]
  },
  number: (data: any): Nullable<number> => {
    return data as number
  },
  string: (data: any): Nullable<string> => {
    return data as string
  },
}

export default DataConversion
