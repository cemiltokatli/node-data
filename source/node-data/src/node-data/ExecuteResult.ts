import DatabaseError from './DatabaseError';

/**
 * An object of this class represents the result of a database insert, delete or update operation.
 */
class ExecuteResult {
  private _affectedRows: number
  private _insertId: number
  private _error: DatabaseError | null

  get affectedRows(): number {
    return this._affectedRows
  }

  get error(): DatabaseError | null {
    return this._error
  }

  get insertId(): number {
    return this._insertId
  }

  constructor(affectedRows: number, insertId: number, error: DatabaseError | null) {
    this._affectedRows = affectedRows
    this._insertId = insertId
    this._error = error
  }
}

export default ExecuteResult
