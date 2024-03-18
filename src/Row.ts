import Field from './Field'

/**
 * Represents a row in a table.
 */
interface Row {
  [key: string]: Field
}

export default Row
