import mysql, {ResultSetHeader, format} from 'mysql2/promise'
import QueryResult from './QueryResult';
import DatabaseError from './DatabaseError';
import ExecuteResult from './ExecuteResult';

/**
 * This class represents a database connection and provides methods to perform various database tasks.
 * It behaves like a layer between user and actual mysql.PoolConnection object.
 */
class Connection {
  private dbConnection: mysql.PoolConnection

  constructor(dbConnection: mysql.PoolConnection) {
    this.dbConnection =  dbConnection
  }

  /**
   * Starts a new transaction.
   */
  public async beginTransaction(): Promise<void> {
    await this.dbConnection.beginTransaction()
  }

  /**
   *
   */
  public async call(procedureCallSql: string, selectSql: string, ...values: any[]): Promise<QueryResult> {
    try {
      await this.dbConnection.query(procedureCallSql, values)
      const [rows] = await this.dbConnection.query(selectSql)

      return new QueryResult(rows as any[], null)
    }
    catch (error) {
      return new QueryResult(
        [],
        new DatabaseError(error.code as string, error.errno as number, error.sql as string, error.sqlState as string, error.sqlMessage as string)
      )
    }
  }

  /**
   * Saves the changes to the database.
   */
  public async commit(): Promise<void> {
    await this.dbConnection.commit()
  }

  /**
   * Executes the given SQL query and returns the results. This method should be used for INSERT, UPDATE and DELETE queries.
   */
  public async execute(sql: string, ...values: any[]): Promise<ExecuteResult> {
    try {
      const [rows] = await this.dbConnection.execute(sql, values)
      const result = rows as ResultSetHeader

      return new ExecuteResult(result.affectedRows, result.insertId, null)
    }
    catch (error) {
      return new ExecuteResult(
        0, 0,
        new DatabaseError(error.code as string, error.errno as number, error.sql as string, error.sqlState as string, error.sqlMessage as string)
      )
    }
  }

  /**
   * Executes the given batch SQL query and returns the results. This method should be used for INSERT, UPDATE and DELETE queries.
   */
  public async executeBatch(sql: string, ...values: any[]): Promise<ExecuteResult> {
    try {
      const batchSql = format(sql, values)
      const [rows] = await this.dbConnection.execute(batchSql)
      const result = rows as ResultSetHeader

      return new ExecuteResult(result.affectedRows, result.insertId, null)
    }
    catch (error) {
      return new ExecuteResult(
        0, 0,
        new DatabaseError(error.code as string, error.errno as number, error.sql as string, error.sqlState as string, error.sqlMessage as string)
      )
    }
  }

  /**
   * Executes the given SQL query and returns the results. This method should be used for SELECT queries.
   *
   */
  public async query(sql: string, ...values: any[]): Promise<QueryResult> {
    try {
      const [rows] = await this.dbConnection.query(sql, values)

      return new QueryResult(rows as any[], null)
    }
    catch (error) {
      return new QueryResult(
        [],
        new DatabaseError(error.code as string, error.errno as number, error.sql as string, error.sqlState as string, error.sqlMessage as string)
      )
    }
  }

  /**
   * Releases the database connection.
   */
  public release() {
    this.dbConnection.release()
  }

  /**
   * Cancels the changes made during the transaction.
   */
  public async rollback(): Promise<void> {
    await this.dbConnection.rollback()
  }
}

export default Connection
