import Database from '../node-data/Database'
import print from './util'

async function transaction(database: Database) {
  const connection = await database.getConnection()
  await connection.beginTransaction()

  const userResult = await connection.execute('INSERT INTO `user`(`username`) VALUES(?)', 'user1')
  const userStatusResult = await connection.execute('INSERT INTO `user_status`(`userId`, `status`) VALUES (?, ?)', userResult.insertId, 'xxx')

  if (userResult.error || userStatusResult.error) {
    await connection.rollback()

    print('Something went wrong!')
    print(userResult?.error)
    print(userStatusResult?.error)
  } else {
    await connection.commit()

    print('Successfully added!')
  }

  connection.release()
}

export default transaction