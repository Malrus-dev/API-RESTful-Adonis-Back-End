import type { HttpContext } from '@adonisjs/core/http'
import Sale from "#models/sale";
import Product from '#models/product';

export default class SalesController {
    public async store({ request, response }: HttpContext) {
      const require = request.only(['clientId', 'productId', 'quantity'])
      const product = await Product.findOrFail(require.productId)
      
      const data = {
        client_id: require.clientId,
        productId: require.productId,
        quantity: require.quantity,
        unitPrice: product.price,
        totalPrice: product.price * require.quantity
      }
      const sale = await Sale.create(data)
      return response.created(sale)
    }
  }