import mysql, {ResultSetHeader, format} from 'mysql2/promise'
import 'reflect-metadata'
import Database from './node-data/Database';
import DatabaseError from './node-data/DatabaseError';
import {Model, ModelField} from './node-data/annotations';


// class Bar {
//   reverse(a: string): string
//   reverse(a: string[]): string[]
//   reverse(a: string | string[]): string | string[] {
//     return 'bobbyhadz.com'
//   }
// }
//
// function reverse(a: string): string;
// function reverse(a: string[]): string[];
// function reverse(a: string | string[]): string | string[] {
//   // your implementation
//   return 'bobbyhadz.com'
// }

// function Model() {
//   return (ctor: Function) => {
//     // console.log('---------- ', ctor)
//     // console.log(': ', Reflect.getMetadata('design:properties', ctor.prototype))
//
//     if (ctor['model']) {
//       ctor['isModel'] = true
//     }
//   }
// }
//
// function ModelField() {
//   return function(target: any, key: string) {
//     if (!target.constructor['model']) {
//       target.constructor['model'] = {}
//     }
//
//     var t = Reflect.getMetadata("design:type", target, key);
//
//     target.constructor['model'][key] = t.name
//
//     // console.log(target, key, t.name, target.constructor)
//   }
// }
//
// @Model()
// class User {
//   @ModelField()
//   public id: number
//
//   @ModelField()
//   public name: string
// }
//
// function query<T>(model: T) {
//   console.log('Inside query')
//
//   if (model['isModel']) {
//     console.log(model['model'])
//   }
// }
//
// interface Row {
//   [key:string]: string
// }

@Model()
class City {
  @ModelField('id')
  public id: number

  @ModelField('name')
  public name: string

  @ModelField('country')
  public country: string

  @ModelField('isCapital')
  public isCapital: boolean

  @ModelField('status')
  public status: Status

  @ModelField('createdAt')
  public date: Date
}

enum Status  {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
  idle = 'IDLE'
}

async function main() {
  // const r: Row = {}
  // r['foo'] = 'bar'
  // r['aa'] = 'bb'
  //
  // query(User)
  //
  // const pool = mysql.createPool({
  //   host: 'localhost',
  //   port: 3306,
  //   user: 'root',
  //   password: 'root',
  //   database: 'main',
  // })
  //
  // const con = await pool.getConnection()
  //
  // const batchInsertSql = format('INSERT INTO city(`name`, `country`, `isCapital`, `status`,  `createdAt`) VALUES ?', [allData])
  // const r = await con.execute(batchInsertSql)

  // const r = await con.execute('INSERT INTO city(`name`, `country`, `isCapital`, `status`,  `createdAt`) VALUES(?, ?, ?, ?, ?)', ['Dublin', 'Republic of Ireland', 1, Status.active, new  Date()])
  // console.log(r)
  //
  // con.release()

  // const res = await con.execute('INSERT INTO city(`name`, `country`, `isCapital`, `createdAt`, `status`) VALUES(?, ?, ?, ?, ?)', ['Tokyo', 'Japan', 1, '2024-03-02 00:00:00', 'ACTIVE'])
  // console.log(res[0] as ResultSetHeader)

  // await con.beginTransaction()

  // try {
  //   const results = await con.query('INSERT INTO user(`username`) VALUES(?)', ['foo'])
  //   console.log(results)
  //   const insertId = (results as ResultSetHeader[])[0].insertId
  //
  //   await con.query('INSERT INTO user_status(`user_id`, `status`) VALUES(?, ?)', [insertId, 'foo'])
  //
  //   await con.commit()
  // } catch (error) {
  //
  //   console.log(error)
  //
  //   await con.rollback()
  // }
  //
  // const x = await con.query("SELECT * FROM user")
  // console.log(x)

  // con.release()

  /*
  res = await con.query('SELECT * FROM user')
  users = res.toList()
  users[0]['name'].toString()

   */


  const allData: any[][] = [
    ['Dublin', 'Republic of Ireland', 1, Status.active, new  Date()],
    ['Cork', 'Republic of Ireland', 0, Status.inactive, new Date()],
    ['Waterford', 'Republic of Ireland', 0, Status.active, new Date() ],
    [ 'Paris', 'France', 1, Status.idle, new Date() ],
    [ 'Berlin', 'German', 1, Status.inactive, new Date() ],
    [ 'London', 'United Kingdom', 1, Status.active, new Date() ],
    [ 'Blackpool', 'United Kingdom', 0, Status.idle, new Date() ],
  ]

  const db = new Database({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'main',
  })

  const con = await db.getConnection()
  const result = await con.call('CALL GetCountryStats(?, @total, @america, @asia, @europe)', 'SELECT @total AS total, @asia AS asia, @europe AS europe, @america AS america', [0])
  const row = result.toRecord()

  console.log(row)

  // const result = await con.executeBatch('INSERT INTO city(`name`, `country`, `isCapital`, `status`,  `createdAt`) VALUES ?', allData)
  //
  // if (result.error) {
  //   console.log('Something went wrong:')
  //   console.log(result.error)
  // } else {
  //   console.log(result.affectedRows)
  // }


  // await con.beginTransaction()
  //
  // const userResult = await con.execute('INSERT INTO `user`(`username`) VALUES(?)', 'xxx')
  // const userStatus = await con.execute('INSERT INTO `user_status`(`user_id`, `status`) VALUES(?, ?)', userResult.insertId, 1)
  //
  // if (userResult.error || userStatus.error) {
  //   console.log('No data added')
  //   // console.log(userResult.error, userStatus.error)
  //   await con.rollback()
  // } else {
  //   console.log('Added')
  //   await con.commit()
  // }
  //
  // con.release()


  // let res = await con.execute('INSERT INTO city(`name`, `country`, `isCapital`, `createdAt`, `status`) VALUES(?, ?, ?, NOW(), ?)', 'Osaka', 'Japan', 0, 'IDLE')
  //
  // if (res.error) {
  //   console.log('Something went wrong')
  //   console.log(res.error)
  // } else {
  //   console.log(`Affected rows: ${res.affectedRows}\nLast Id: ${res.insertId}`)
  // }


  // let cityResult = await con.query('SELECT * FROM city WHERE id = 2')
  //
  // if (cityResult.error) {
  //   console.log('Something went wrong')
  //   console.log(cityResult.error)
  // } else {
  //   // const c = cityResult.toRecord()
  //   // console.log(c!['id'].toNumber(), c!['name'].toString(), c!['country'].toString(), c!['isCapital'].toBoolean(), c!['status'].toEnum(Status) === Status.active, c!['createdAt'].toDate().getFullYear())
  //
  //   const c = cityResult.toRecord(City.prototype)
  //   console.log(c!.id, c!.name, c!.country, c!.isCapital, c!.status === Status.active, c!.date.getFullYear())
  // }

  /*
  let citiesResult = await con.query('SELECT * FROM city')

  if (citiesResult.error) {
    console.log('Something went wrong')
    console.log(citiesResult.error)
  } else {
    console.log(citiesResult.isDataAvailable())
    const list = citiesResult.toList(City.prototype)

    for (const row of list) {

      console.log(row.id, row.name, row.country, row.isCapital, row.status === Status.inactive, row.date.getFullYear())

      // const status = row['status'].toEnum(Status)
      // console.log(row['id'].toNumber(), row['name'].toString(), ",", row['country'].toString(), ",", row['isCapital'].toBoolean(), status === Status.active, row['createdAt'].toDate().getFullYear())
    }
  }
  */
}

main()
