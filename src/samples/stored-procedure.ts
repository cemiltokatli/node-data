import Database from '../node-data/Database'
import print from './util'

async function storedProcedure(database: Database) {
  const connection = await database.getConnection()
  const isAmericaOnly = 0
  const result = await connection.call(
    'CALL GetCountryStats(?, @america, @europe, @asia)',
    'SELECT @america AS america, @europe AS europe, @asia AS asia',
    [isAmericaOnly]
  )

  const row = result.toRecord()

  print(`
  America: ${row!['america']}
  Europe: ${row!['europe']}
  Asia: ${row!['asia']}
  `)

  connection.release()
}

export default storedProcedure