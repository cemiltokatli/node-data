import Database from '../node-data/Database'
import print from './util'

async function batchInsert(database: Database) {
  const connection = await database.getConnection()

  const data = [
    ['Nineteen Eighty-Four', 'George Orwell'],
    ['Animal Farm', 'George Orwell'],
    ['Hard Times', 'Charles Dickens'],
    ['Scenes of Clerical Life', 'George Eliot'],
    ['Robinson Crusoe', 'Daniel Defoe'],
  ]

  const result = await connection.executeBatch('INSERT INTO `book`(`name`, `author`) VALUES ?', data)

  if (result.error) {
    print('Something went wrong!')
    print(result.error)
  } else {
    print(`
    Affected rows: ${result.affectedRows}
    `)
  }

  connection.release()
}

export default batchInsert