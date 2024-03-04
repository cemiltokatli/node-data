/**
 * Scheme of a database configuration object.
 */
interface Config {
  host: string
  port: number
  user: string
  password: string
  database: string
}

export default Config
