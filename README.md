# Node Data

`node-data` is a database helper library that provides classes and methods for you to query MySQL database.

## Structure

`Database` class is the fundamental block of the library. It creates a connection pool to a database. An object of this class should be initialized per database used in the application and the same object should be used everywhere to query the same database.

`getConnection()` method of `Database` class returns a new `Connection` object which represents an isolated database connection grabbed from the pool. It is cheap to create a `Connection` object as it is just a wrapper for `mysql.PoolConnection` object. When you call `getConnection()` method, it retrieves a connection from the pool by using `getConnection()` method of `mysql.Pool` object and initializes `Connection` object with that actual database connection object.

## Reference

### Annotations

#### `@Model`

Marks a class as a database table. It is used for mapping tables to objects while fetching data from database.

#### `@ModelField(column: string)`

Marks a class property as a database field. It is used for mapping fields to class properties while fetching data from database. It takes a string parameter which determines the name of the field in a database table.

### `Config` interface

It is the sceme of a database configuration object.

```typescript
interface Config {
  host: string
  port: number
  user: string
  password: string
  database: string
}
```

### `Connection` class

It represents an isolated database connection. You usually create a new connection per request in a web application. 

```typescript
class Connection {
	constructor(dbConnection: mysql.PoolConnection)
  public async beginTransaction(): Promise<void>
  public async call(procedureCallSql: string, selectSql: string, ...values: any[]): Promise<QueryResult>
  public async commit(): Promise<void>
  public async execute(sql: string, ...values: any[]): Promise<ExecuteResult>
  public async executeBatch(sql: string, ...values: any[]): Promise<ExecuteResult>
  public async query(sql: string, ...values: any[]): Promise<QueryResult>
  public release()
  public async rollback(): Promise<void>
}
```

### `DataConversion` object

It is a single object. It just provides methods to convert given data to certain types.

```typescript
const DataConversion = {
	boolean: (data: any): Nullable<boolean>,
  date: (data: any): Nullable<Date>,
  enum: <T>(model: T, data: any): Nullable<T[keyof T]>,
  number: (data: any): Nullable<number>,
  string: (data: any): Nullable<string>
}
```

### `Database` class

It creates a new connection pool to a single database. It is used for getting a connection to the database.

```typescript
class Database {
  constructor(config: Config)
  public async getConnection(): Promise<Connection>
}
```

### `DatabaseError` class

It represents a database error.

```typescript
class DatabaseError {
	constructor(code: string, errno: number, sql: string, sqlState: string, sqlMessage: string)
}
```

### `ExecuteResult` class

It stores information about the result of an INSERT, UPDATE or DELETE execution.

```typescript
class ExecuteResult {
	constructor(affectedRows: number, insertId: number, error: DatabaseError | null)
  get affectedRows(): number
  get error(): DatabaseError | null
  get insertId(): number
}
```

### `Field` class

An object of this class represents a single field in a row, esentially represents data in a cell. It provides methods to convert data to certain types.

``` typescript
class Field {
	constructor(data: any)
  public toBoolean(): Nullable<boolean>
  public toDate(): Nullable<Date>
  public toEnum<T>(model: T): Nullable<T[keyof T]>
  public toNumber(): Nullable<number>
  public toString(): Nullable<string>
}
```

### `QueryResult` class

It stores information about the result of a SELECT query.

```typescript
class QueryResult {
	constructor(data: any[], error: DatabaseError | null)
  get error(): DatabaseError | null
  public isDataAvailable(): boolean
  public toList(model?: undefined): Row[]
  public toList<T>(model: T): T[]
  public toRecord(model?: undefined): Row | null
  public toRecord<T>(model: T): T | null
}
```

### `Row` interface

It is the scheme of an object that stores data of a row created as result of a SELECT query.

Each key of this object corresponds to a column in a table.

```typescript
interface Row {
  [key: string]: Field
}
```

