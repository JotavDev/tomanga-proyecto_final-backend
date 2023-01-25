import products from '../products/controller.products.js'
import carts from '../carts/controller.carts.js'
import users from '../users/controller.users.js'

const routes = (app) => {
    app.use('/api/products', products)
    app.use('/api/carts', carts)
    app.use('/', users)
}

export default routes;