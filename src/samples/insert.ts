import Database from '../node-data/Database'
import print from './util'

async function insert(database: Database) {
  const connection = await database.getConnection()
  const result = await connection.execute('INSERT INTO `book`(`name`, `author`) VALUES (?, ?)', 'Toilers of the Sea', 'Victor Hugo')

  if (result.error) {
    print('Something went wrong!')
    print(result.error)
  } else {
    print(`
    Affected rows: ${result.affectedRows}
    Insert id: ${result.insertId}
    `)
  }

  connection.release()
}

export default insert