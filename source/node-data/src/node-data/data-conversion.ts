/**
 * Provides methods to convert data to certain types.
 */
const DataConversion = {
  boolean: (data: any): boolean => {
    return (data as number) === 1
  },
  date: (data: any): Date => {
    return data as Date
  },
  enum: <T>(model: T, data: any): T[keyof T] => {
    const result = Object.keys(model as any).find(k => (model as any)[k] == data)

    return (model as any)[result as any]
  },
  number: (data: any): number => {
    return data as number
  },
  string: (data: any): string => {
    return data as string
  },
}

export default DataConversion
