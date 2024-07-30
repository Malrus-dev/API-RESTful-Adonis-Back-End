import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Sale from '#models/sale'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare category: string

  @column()
  declare price: number

  @column()
  public deleted!: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  public async softDelete() {
    this.deleted = true
    await this.save()
  }
}