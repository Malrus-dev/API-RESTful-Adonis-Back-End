
import { test } from '@japa/runner'
import assert from 'assert'
import Sale from '#models/sale'
import Client from '#models/client'
import Product from '#models/product'

test.group('Route clients', () => {
  let token: string = ''
  const user_form = {
    email: 'client@example.com',
    password: 'XXXXXX'
  }
  
  test('can not access to clients without token in /clients', async ({ client }) => {
    const response = await client.get('/clients')    

    response.assertStatus(401)
    response.assertBodyContains({ errors: [ { message: 'Unauthorized access' } ] })
  })

  test('can access to clients with token in /clients', async ({ client }) => {
    await client.post('/signup')
      .form(user_form)
    const user = await client.post('/login')
      .form(user_form)

    token = user.body().token
    const response = await client.get('/clients').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
  })

  test('shows an error when searching for a clients that does not exist in /clients/:id', async ({ client }) => {
    const response = await client.get('/clients/999').header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    response.assertBodyContains({ message: 'Row not found' })
  })

  test('create client in /clients', async ({ client }) => {
    const response = await client.post('/clients')
    .form({
      name: 'Testonildo',
      cpf: 22025734026,
      email: 'Testonildo@email.com',
    })
    .header('Authorization', `Bearer ${token}`)

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'Testonildo',
      cpf: '22025734026',
      email: 'Testonildo@email.com',
      id: 1
    })
  })

  test('show details of a client and their related sales in /clients/:id', async ({ client }) => {
    const clientPayload = {
      name: 'Comprador',
      cpf: '58444466077',
      email: 'Comprador@email.com'
    }

    await Client.create(clientPayload)

    await Product.createMany([
      {
        name: 'laptop',
        description: 'laptop description',
        price: 1000,
        category: 'eletronic'
      },
      {
        name: 'smarthphone',
        description: 'smarthphone description',
        price: 1200,
        category: 'eletronic'
      },
      {
        name: 'chair',
        description: 'chair description',
        price: 200,
        category: 'furniture'
      }
    ])

    await Sale.createMany([
      {
        clientId: 1,
        productId: 1,
        quantity: 1,
        unitPrice: 1000,
        totalPrice: 1000,
      },
      {
        clientId: 1,
        productId: 2,
        quantity: 2,
        unitPrice: 1200,
        totalPrice: 2400,
      },
      {
        clientId: 1,
        productId: 3,
        quantity: 4,
        unitPrice: 200,
        totalPrice: 800,
      }
    ])

    const response = await client.get('/clients/1').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)

  })

  test('return all clients ordered by id in /clients', async ({ client }) => {
    const clientPayload = {
      name: 'Comprador2',
      cpf: '93191319026',
      email: 'Comprador2@email.com'
    }

    await Client.create(clientPayload)
    const response = await client.get('/clients').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
  })

  test('update client in /clients/:id', async ({ client }) => {
    const response = await client.put('/clients/1')
    .form({
      name: 'Trocanildo',
    })
    .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    response.assertBodyContains({
      name: 'Trocanildo',
    })
  })

  test('delete client in /clients/:id', async ({ client }) => {
    const response = await client.delete('/clients/1')
    .header('Authorization', `Bearer ${token}`)
    response.assertStatus(204)
  })

  test('There should be an error when searching for a deleted client or related sales in /clients/:id', async ({ client }) => {
    const response = await client.get('/clients/1').header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    response.assertBodyContains({ message: 'Row not found' })
  })
  
})