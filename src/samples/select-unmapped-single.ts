import Database from '../node-data/Database'
import print from './util'

async function selectUnmappedSingle(database: Database) {
  const connection = await database.getConnection()
  const result = await connection.query('SELECT * FROM book WHERE name = ?', 'Dead Souls')
  const row = result.toRecord()

  if (!row) {
    print('No record found')
  } else {
    print(`
    ID: ${row['id']}
    Name: ${row['name']}
    Author: ${row['author']}
    `)
  }

  connection.release()
}

export default selectUnmappedSingle