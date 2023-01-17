import products from '../products/controller.products.js'

const routes = (app) => {
    app.use('/api/products', products)
}

export default routes;