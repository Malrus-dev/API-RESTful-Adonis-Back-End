import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
    async signup({ request, response }: HttpContext) {
        const body = request.body()
        const user = await User.create(body)
        response.created(user)
    }
    
    async login({ request, response }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user)
        response.ok(token)
    }
}

//{ message: `Invalid credentials ${user.password} !== ${body.password}` }