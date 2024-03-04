import mysql from 'mysql2/promise'
import Config from './Config';
import Connection from './Connection';

/**
 * This should be a singleton class.
 * Only one instance should be created and it should be used through whole application.
 * When an instance of this class is created, it creates a database connection pool.
 */
class Database {
  private pool: mysql.Pool

  constructor(config: Config) {
    this.pool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
    })
  }

  /**
   * Initializes a new Connection object.
   */
  public async getConnection(): Promise<Connection> {
    const con = await this.pool.getConnection()

    return new Connection(con)
  }
}

export default Database
