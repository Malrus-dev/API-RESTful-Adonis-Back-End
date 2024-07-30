import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import mysql from 'mysql2/promise'
import { exec, spawn } from 'child_process'
import env from '#start/env'

export default class RunWithData extends BaseCommand {
  static commandName = 'run:with-data'
  static description = `Create the database if it is not already created, run 
    migrations and run the server using the node ace serve --hmr command`

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Initializing database...')

    const connection = await mysql.createConnection({
      host: env.get('DB_HOST', 'localhost'),
      user: env.get('DB_USER', 'root'),
      password: env.get('DB_PASSWORD', ''),
    })

    const database = env.get('DB_DATABASE', 'adonis')

    try {
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
      this.logger.info(`Database '${database}' created or already exists.`)

      await connection.end()

      this.logger.info('Running migrations...')
      await new Promise<void>((resolve, reject) => {
        const migrations = spawn('node', ['ace', 'migration:run'], {
          stdio: 'inherit',
        })
        
        migrations.on('close', (code) => {
          if (code === 0) {
            resolve()
          }
        })

        migrations.on('error', (err) => {
          reject(`Error running migrations: ${err.message}`)
        })

        this.logger.info('Migrations ran successfully.')

      })

    } catch (error) {
      this.logger.error('Error creating database:', error)
    }

    try {

      // Start the server after migrations
      this.logger.info('Starting the server...')
      const server = spawn('node', ['ace', 'serve', '--hmr'], {
        stdio: 'inherit',
      })

      server.on('error', (err) => {
        this.logger.error(`Error starting the server: ${err.message}`)
      })

    } catch (error) {
      this.logger.error('Error starting server:', error)
    }
  }
}