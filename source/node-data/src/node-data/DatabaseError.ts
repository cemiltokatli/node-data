/**
 * Represents a database error.
 */
class DatabaseError {
  public code: string
  public errno: number
  public sql: string
  public sqlState: string
  public sqlMessage: string

  constructor(code: string, errno: number, sql: string, sqlState: string, sqlMessage: string) {
    this.code = code
    this.errno = errno
    this.sql = sql
    this.sqlState = sqlState
    this.sqlMessage = sqlMessage
  }
}

export default DatabaseError
