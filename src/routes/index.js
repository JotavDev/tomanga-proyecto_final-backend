import products from '../products/controller.products.js'
import carts from '../carts/controller.carts.js'
import home from '../home-page/controller.home-page.js'
import realTimeProducts from '../real-time-products/controller.real-time-products.js'

const routes = (app) => {
    app.use('/api/products', products)
    app.use('/api/carts', carts)
    app.use('/', home)
    app.use('/realtimeproducts', realTimeProducts)
}

export default routes;