/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('#controllers/users_controller')
const ClientsController = () => import('#controllers/clients_controller')
const ProductsController = () => import('#controllers/products_controller')
const SalesController = () => import('#controllers/sales_controller')



router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// User routes
router.post('/signup', [UsersController, 'signup'])
router.post('/login', [UsersController, 'login'])

// Client routes
router.group(() => {
  router.get('/clients', [ClientsController, 'index'])
  router.get('/clients/:id', [ClientsController, 'show'])
  router.post('/clients', [ClientsController, 'store'])
  router.put('/clients/:id', [ClientsController, 'update'])
  router.delete('/clients/:id', [ClientsController, 'delete'])
}).use(middleware.auth())

// Product routes
router.group(() => {
  router.get('/products', [ProductsController, 'index'])
  router.get('/products/:id', [ProductsController, 'show'])
  router.post('/products', [ProductsController, 'store'])
  router.put('/products/:id', [ProductsController, 'update'])
  router.delete('/products/:id', [ProductsController, 'delete'])
}).use(middleware.auth())

// Sales routes
router.group(() => {
  router.post('/sales', [SalesController, 'store'])
}).use(middleware.auth())