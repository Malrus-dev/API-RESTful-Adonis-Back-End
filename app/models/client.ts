import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Phone from '#models/phone'
import Address from '#models/address'
import Sale from '#models/sale'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Phone)
  declare phones: HasMany<typeof Phone>

  @hasMany(() => Address)
  declare addresses: HasMany<typeof Address>

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @column()
  declare email: string

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}