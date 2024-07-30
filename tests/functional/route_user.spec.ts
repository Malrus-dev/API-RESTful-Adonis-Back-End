import { test } from '@japa/runner'

test.group('Route of user', () => {
  const user_form = {
    email: 'user@example.com',
    password: 'XXXXXX'
  }

  test('user created in /singup', async ({ client }) => {
    const response = await client.post('/signup')
      .form(user_form)
      
    response.assertStatus(201)
    response.assertBodyContains({ email: 'user@example.com' })
  })
  
  test('user logged in /login', async ({ client }) => {
    const response = await client.post('/login')
      .form(user_form)
      
    const token = response.body().token
    
    response.assertStatus(200)
    response.assertBodyContains({ type: 'bearer', abilities: [ '*' ], lastUsedAt: null, token: token })
  })
})