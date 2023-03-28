import Router  from 'express';
import ProductManager  from '../dao/mongo/products/productManager.mongo.js';

const router = Router();

const product = new ProductManager()

router.get('/', async (req, res) => {
    try{
        const response = await product.find(req)
        res.render("products.handlebars", {
            product: await response.payload,
            title: "| Los mejores mangas",
            style: "/index.css",
            pages: await response,
            user: req.user
        })
    } catch(error){
        res.status(500).json({error})
    }
});

export default router