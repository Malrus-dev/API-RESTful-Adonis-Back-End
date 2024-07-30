import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductsController {
    public async index({ response }: HttpContext) {
      const products = await Product.query().where('deleted', false).orderBy('name')
      return response.ok(products)
    }
  
    public async show({ params, response }: HttpContext) {
      //const product = await Product.findOrFail(params.id)
      const product = await Product.query().where('id', params.id).andWhere('deleted', false).firstOrFail()
      return response.ok(product)
    }
  
    public async store({ request, response }: HttpContext) {
      const data = request.only(['name', 'description','category', 'price'])
      const product = await Product.create(data)
      return response.created(product)
    }
  
    public async update({ params, request, response }: HttpContext) {
      const product = await Product.findOrFail(params.id)
      const data = request.only(['name', 'description','category', 'price'])
      product.merge(data)
      await product.save()
      return response.ok(product)
    }
  
    public async delete({ params, response }: HttpContext) {
      const product = await Product.findOrFail(params.id)
      await product.softDelete()
      return response.noContent()
    }
  }