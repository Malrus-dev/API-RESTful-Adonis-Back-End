import { test } from '@japa/runner'

test.group('Route products', () => {
  let token: string = ''
  const user_form = {
    email: 'product@example.com',
    password: 'XXXXXX'
  }
  
  test('can not access to products without token in /products', async ({ client }) => {
    const response = await client.get('/products')    

    response.assertStatus(401)
    response.assertBodyContains({ errors: [ { message: 'Unauthorized access' } ] })
  })

  test('can access to products with token in /products', async ({ client }) => {
    await client.post('/signup')
      .form(user_form)
    const user = await client.post('/login')
      .form(user_form)

    user.body().token
    token = user.body().token
    const response = await client.get('/products').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
  })

  test('shows an error when searching for a product that does not exist in /products/:id', async ({ client }) => {
    const response = await client.get('/products/999').header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    response.assertBodyContains({ message: 'Row not found' })
  })

  test('create product in /products', async ({ client }) => {
    const response = await client.post('/products')
    .form({
      name: 'product',
      description: 'product description',
      price: 100,
      category: 'generic'
    })
    .header('Authorization', `Bearer ${token}`)
    response.assertStatus(201)
    response.assertBodyContains({
      name: 'product',
      description: 'product description',
      category: 'generic',
      price: '100',
    })
  })

  test('show details of one product in /products/:id', async ({ client }) => {
    const response = await client.get('/products/1').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    response.assertBodyContains({
      name: 'laptop',
      description: 'laptop description',
      category: 'eletronic',
      price: '1000.00',
    })
  })

  test('return all products in /products', async ({ client }) => {
    const response = await client.get('/products').header('Authorization', `Bearer ${token}`)
    
    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('update product in /products/:id', async ({ client }) => {
    const response = await client.put('/products/1')
    .form({
      name: 'product2',
    })
    .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    response.assertBodyContains({
      name: 'product2',
    })
  })

  test('delete product in /products/:id', async ({ client }) => {
    const response = await client.delete('/products/1')
    .header('Authorization', `Bearer ${token}`)
    response.assertStatus(204)
  })

  test('There should be an error when searching for a deleted product in /products/:id', async ({ client }) => {
    const response = await client.get('/products/1').header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    response.assertBodyContains({ message: 'Row not found' })
  })
  
})