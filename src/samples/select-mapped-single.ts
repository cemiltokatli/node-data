import Database from '../node-data/Database'
import {Model, ModelField} from '../node-data/annotations'
import print from './util'

@Model()
class Book {
  @ModelField('id')
  public id: number

  @ModelField('name')
  public bookName: string

  @ModelField('author')
  public bookAuthor: string
}

async function selectMappedSingle(database: Database) {
  const connection = await database.getConnection()
  const result = await connection.query('SELECT * FROM book WHERE name = ?', 'Crime and Punishment')
  const row = result.toRecord(Book.prototype)

  if (!row) {
    print('No record found')
  } else {
    print(`
      ID: ${row.id}
      Name: ${row.bookName}
      Author: ${row.bookAuthor}
    `)
  }

  connection.release()
}

export default selectMappedSingle