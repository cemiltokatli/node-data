# Node Data

```typescript
Module: node-data

interface Config {
  host: string
  port: number
  user: string
  password: string
  database: string
}

/**
	* This is a singleton class.
  * Only one instance should be created and it should be used through all application.
  * When an instance of this class is created, it creates a database connection pool.
	*/
class Database {
  private  pool: mysql.Pool
  
  constructor(config: Config)
  
	/**
		* Initializes a new Connection object.
		*/
  public async getConnection(): Promise<Connection>
}

/**
	* This class represents a database connection and provides methods to perform various database tasks.
	* It behaves like a layer between user and actual mysql.PoolConnection object.
	*/
class Connection {
  private pool: mysql.PoolConnection
  
  constructor(connection: mysql.PoolConnection)
  
  /**
  	* Starts a new transaction.
  	*/
  public async beginTransaction(): Promise<void>
    
	/**
	  * Saves the changes to the database.
	  */
	public async commit(): Promise<void>
    
  /**
  	* Executes the given SQL query and returns the results. This method should be used for INSERT, UPDATE and DELETE queries.
    */
  public async execute(sql: string, values: ...any[]): Promise<ExecuteResult> throws DatabaseException
  
  /**
  	* Executes the given batch SQL query and returns the results. This method should be used for INSERT, UPDATE and DELETE queries.
  	*/
  public async executeBatch(sql: string, values: ...any[]): Promise<ExecuteResult> throws DatabaseException
  
  /**
  	* Executes the given SQL query and returns the results. This method should be used for SELECT queries.
  	*/
  public async query(sql: string, values: ...any[]): Promise<QueryResult> throws DatabaseException
    
  /**
  	* Releases the database connection.
  	*/
  public release()
  
  /**
  	* Cancels the changes made during the transaction.
   	*/
  public async rollback(): Promise<void>
}

/**
	* Represents a database error.
	*/
class DatabaseException extends Error {
  public code: string
  public errno: number
  public sql: string
  public sqlState: string
  public sqlMessage: string
}
  
/**
	* An object of this class represents the result of a database insert, delete or update operation.
	*/
class ExecuteResult {
  private _affectedRows: number
  private _insertId: number
  
  constructor(affectedRows: number, insertId: number)
  
  public get affectedRows: number
  public get insertId: number
}
  
/**
	* An object of this class represents the result of a database select query. 
	* It is initialized by the method which actually fetches the data.
	*/
class QueryResult {
  private data: any[]
  
  constructor(data: any[])
  
  /**
  	* Returns a boolean value indicates whether any data is found or not.
  	*/
  public isDataAvailable(): boolean
  
  /**
  	*	Returns the results as an array. This method is used for fetching multiple rows.
  	*/
  public toList(): Row[]
  
  /**
  	* Returns the results as an array of model objects. This method is used for fetching multiple rows.
  	*/
  public toList<T>(model: T): T[]
 
  /**
  	* Returns the result as an object. This method is used for fetching a single row. If there is no data found, it returns `null`.
  	*/
  public toRecord(): Row | null
  
  /**
  	* Returns the result as an model object. This method is used for fetching a single row. If there is no data found, it returns `null`.
  	*/
  public toRecord<T>(model: T): T | null
}
  
/**
	* Represents a row in a table.
	*/
interface Row {
  [key:string]: Field
}
  
/**
	* Represents a field in a row. It provides methods to convert data to JS data types.
	*/
class Field {
  private data: any
  
  constructor(data: any)
  
  /**
  	* Converts the data to boolean and returns it.
  	*/
  public toBoolean(): boolean
  
  /**
  	* Convers the data to Date and returns it.
  	*/
  public toDate(): Date
  
  /**
  	* Converts the data to enum and returns it.
  	*/
  public toEnum<T>(enum: T): T
  
  /**
  	* Converts the data to number and returns it.
  	*/
  public toNumber(): number
  
  /**
  	* Convers the data to string and returns it.
  	*/
  public toString(): string
  
  
}
```

