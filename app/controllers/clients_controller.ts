import { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'
import Sale from '#models/sale'

export default class ClientsController {
  public async index({ response }: HttpContext) {
    const clients = await Client.query().orderBy('id')
    return response.ok(clients)
  }

  public async show({ params, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const sales = await Sale.query()
      .where('clientId', client.id)
      .orderBy('dateTime', 'desc')
    return response.ok({ client, sales })
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'cpf', 'email', 'phones'])
    const client = await Client.create(data)
    return response.created(client)
  }

  public async update({ params, request, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const data = request.only(['name', 'cpf', 'email', 'phones'])
    client.merge(data)
    await client.save()
    return response.ok(client)
  }

  public async delete({ params, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    await client.delete()
    return response.noContent()
  }
}
