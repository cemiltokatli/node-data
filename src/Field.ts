import DataConversion from './data-conversion'
import Nullable from './Nullable'

/**
 * Represents a field in a row. It provides methods to convert data to JS data types.
 */
class Field {
  private data: any

  constructor(data: any) {
    this.data = data
  }

  /**
   * Converts the data to boolean and returns it.
   */
  public toBoolean(): Nullable<boolean> {
    return DataConversion.boolean(this.data)
  }

  /**
   * Converts the data to date and returns it.
   */
  public toDate(): Nullable<Date> {
    return DataConversion.date(this.data)
  }

  /**
   * Converts the data to enum type and returns it.
   */
  public toEnum<T>(model: T): Nullable<T[keyof T]> {
    return DataConversion.enum(model, this.data)
  }

  /**
   * Converts the data to number and returns it.
   */
  public toNumber(): Nullable<number> {
    return DataConversion.number(this.data)
  }

  /**
   * Converts the data to string and returns it.
   */
  public toString(): Nullable<string> {
    return DataConversion.string(this.data)
  }
}

export default Field
