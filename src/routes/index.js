import products from '../products/controller.products.js'
import productsViews from '../products/controllerProductsViews.js'
import carts from '../carts/controller.carts.js'
import home from '../home-page/controller.home-page.js'
import realTimeProducts from '../real-time-products/controller.real-time-products.js'
import chat from '../chat/chat.controller.js'
import messages from '../chat/messages.controller.js'
import cartView from '../carts/controller.cartView.js'
// import login from '../login/controller.login.js'
import session from '../session/controller.session.js'
// Recién agregado
import viewsTemplate from '../viewsTemplate/controller.viewsTemplate.js'
import usersController from '../users/controller.users.js'
import authController from '../auth/controller.auth.js'

const routes = (app) => {
    app.use('/api/products', products)
    app.use('/products', productsViews)
    app.use('/api/carts', carts)
    app.use('/home', home)
    app.use('/realtimeproducts', realTimeProducts)
    app.use('/api/chat', chat)
    app.use('/api/messages', messages)
    app.use('/cart', cartView)
    // app.use('/', login)
    // Recién agregado
    app.use('/', viewsTemplate)
    app.use('/session', session)
    app.use('/users', usersController)
    app.use('/auth', authController)
}

export default routes;