import { Router } from 'express';
import ProductManager  from '../products/productManager.js';

const router = Router();
const productos = new ProductManager();
let products = productos.getProducts();

router.get("/", async (req, res) => {
    let product = await products;
    const { limit } = req.query;
    product = limit ? await product.slice(0, limit) : await product;
    res.render("home.handlebars", {
        product: await product,
        style: "/index.css",
        title: "Los mejores mangas"
    })
})

export default router;