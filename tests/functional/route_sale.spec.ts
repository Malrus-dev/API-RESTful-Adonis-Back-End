import { test } from '@japa/runner'

test.group('Route sale', () => {
  test('can not access to sale without token in /sales', async ({ client }) => {
    const response = await client.post('/sales')
      .form({
        client_id: 2,
        product_id: 1,
        quantity: 1
      })   

    response.assertStatus(401)
    response.assertBodyContains({ errors: [ { message: 'Unauthorized access' } ] })
  })

  test('can register sale in /sales', async ({ client }) => {
    const user_form = {
      email: 'client@example.com',
      password: 'XXXXXX'
    }
    const user = await client.post('/login')
      .form(user_form)
    const token = user.body().token
    const response = await client.post('/sales')
      .form({
        clientId: 2,
        productId: 2,
        quantity: 1
      })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(201)
    response.assertBodyContains({
      clientId: '2',
      productId: '2',
      quantity: '1',
      unitPrice: '1200.00',
      totalPrice: 1200,
    })
  })
})