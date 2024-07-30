import mysql from 'mysql2/promise'
import env from '#start/env'

export default class MakeDb {
  async run() {
    const connection = await mysql.createConnection({
      host: env.get('DB_HOST', 'localhost'),
      user: env.get('DB_USER', 'root'),
      password: env.get('DB_PASSWORD', ''),
    })

    const database = env.get('DB_DATABASE', 'adonis')

    try {
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
      await connection.end()
    } catch (error) {
      console.error('Error creating database:', error)
    }
  }
}