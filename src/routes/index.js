import products from '../products/controller.products.js'
import productsViews from '../products/controllerProductsViews.js'
import carts from '../carts/controller.carts.js'
import home from '../home-page/controller.home-page.js'
import realTimeProducts from '../real-time-products/controller.real-time-products.js'
import chat from '../chat/chat.controller.js'
import messages from '../chat/messages.controller.js'

const routes = (app) => {
    app.use('/api/products', products)
    app.use('/products', productsViews)
    app.use('/api/carts', carts)
    app.use('/', home)
    app.use('/realtimeproducts', realTimeProducts)
    app.use('/api/chat', chat)
    app.use('/api/messages', messages)
}

export default routes;