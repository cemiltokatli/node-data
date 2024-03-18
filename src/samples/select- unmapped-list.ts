import Database from '../node-data/Database'
import print from './util'

async function selectUnmappedList(database: Database) {
  const connection = await database.getConnection()
  const result = await connection.query('SELECT * FROM book')
  const rows = result.toList()

  print('*************** LIST ***************')
  for (const row of rows) {
    print(`
    ID: ${row['id']}
    Name: ${row['name']}
    Author: ${row['author']}
    `)
  }

  connection.release()
}

export default selectUnmappedList