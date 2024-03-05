import DataConversion from './data-conversion'

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
  public toBoolean(): boolean {
    return DataConversion.boolean(this.data)
  }

  public toDate(): Date {
    return DataConversion.date(this.data)
  }

  /**
   * Converts the data to enum type and returns it.
   */
  public toEnum<T>(model: T): T[keyof T] {
    return DataConversion.enum(model, this.data)
  }

  /**
   * Converts the data to number and returns it.
   */
  public toNumber(): number {
    return DataConversion.number(this.data)
  }

  /**
   * Converts the data to string and returns it.
   */
  public toString(): string {
    return DataConversion.string(this.data)
  }
}

export default Field
