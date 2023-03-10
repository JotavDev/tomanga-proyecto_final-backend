import Router  from 'express';
import ProductManager  from '../dao/mongo/products/productManager.mongo.js';
import productsModel from '../dao/models/products.model.js';

const router = Router();

const product = new ProductManager()

router.get('/', async (req, res) => {
    try{
        const response = await product.find()
        res.render("home.handlebars", {
            product: await response,
            style: "/index.css"
        })
    } catch(error){
        res.status(500).json({error})
    }
});

export default router;