import Row from './Row'
import DatabaseError from './DatabaseError'
import Field from './Field'
import DataConversion from './data-conversion'

/**
 * An object of this class represents the result of a database SELECT query.
 * It is initialized by the method which actually fetches the data.
 */
class QueryResult {
  private data: any[]
  private _error: DatabaseError | null

  get error(): DatabaseError | null {
    return this._error
  }

  constructor(data: any[], error: DatabaseError | null) {
    this.data = data
    this._error = error
  }

  /**
   * Returns a boolean value indicates whether any data is found or not.
   */
  public isDataAvailable(): boolean {
    return this.data.length > 0
  }

  /**
   * Returns the results as an array of `Row`. This method is used for fetching multiple rows.
   */
  public toList(model?: undefined): Row[]
  /**
   * Returns the results as an array of `T`, which is a model class. This method is used for fetching multiple rows.
   */
  public toList<T>(model: T): T[]
  public toList<T>(model: T | undefined): T[] | Row[] {
    // No model class is defined.
    if (model === undefined) {
      let rows: Row[] = []

      if (this.data.length > 0) {
        // "keys" stores the columns fetched in the SELECT query.
        const keys = Object.keys(this.data[0])

        // Go through each row
        for (const item of this.data) {
          let row: Row = {}

          // Go through each column in the row
          for (const key of keys) {
            row[key] = new Field(item[key])
          }

          rows.push(row)
        }
      }

      return rows
    }

    // A model class is defined.
    let rows: T[] = []

    const modelClass = (model as any).constructor as any
    const isModel = (modelClass as any)['isModel']

    if (isModel && this.data.length > 0) {
      // "fields" stores the mapping information
      const fields = (modelClass as any)['model']
      const classProperties = Object.keys(fields)

      // Go through each row
      for (const item of this.data) {
        let row: any = new (modelClass as any)()

        // Go through each class property
        for (const classProperty of classProperties) {
          const field = fields[classProperty] as {type: string, column: string}
          row[classProperty] = ((DataConversion as any)[field.type] as any)(item[field.column], field.type)
        }

        rows.push(row)
      }
    }

    return rows
  }

  /**
   * Returns the result as a `Row` object. This method is used for fetching a single row. If there is no data found, it returns `null`.
   */
  public toRecord(model?: undefined): Row | null
  /**
   * Returns the result as a `T` object. This method is used for fetching a single row. If there is no data found, it returns `null`.
   */
  public toRecord<T>(model: T): T | null
  public toRecord<T>(model: T | undefined): T | Row | null {
    // No module class is defined.
    if (model === undefined) {
      let row: Row | null = null

      if (this.data.length > 0) {
        row = {}

        // "keys" stores the columns fetched in the SELECT query.
        const keys = Object.keys(this.data[0])

        // Go through each column
        for (const key of keys) {
          row[key] = new Field(this.data[0][key])
        }
      }

      return row
    }

    // A model class is defined.
    let row: T | null = null

    const modelClass = (model as any).constructor as any
    const isModel = (modelClass as any)['isModel']

    if (isModel && this.data.length > 0) {
      row = {} as T

      // "fields" stores the mapping information
      const fields = (modelClass as any)['model']
      const classProperties = Object.keys(fields)

      // Go through each class property
      for (const classProperty of classProperties) {
        const field = fields[classProperty] as {type: string, column: string}
        (row as any)[classProperty] = ((DataConversion as any)[field.type] as any)(this.data[0][field.column], field.type)
      }
    }

    return row
  }
}

export default QueryResult
