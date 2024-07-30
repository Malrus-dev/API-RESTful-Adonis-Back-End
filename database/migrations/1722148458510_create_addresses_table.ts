import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.string('name').nullable()
      table.integer('number').notNullable()
      table.string('street').notNullable()
      table.string('district').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.string('country').notNullable()
      table.string('zip_code').notNullable()
      table.string('complement').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}