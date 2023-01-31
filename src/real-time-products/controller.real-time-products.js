import { Router } from 'express';
import ProductManager  from '../products/productManager.js';
import  { io }  from '../app.js';

const router = Router();
const productos = new ProductManager();
let products = productos.getProducts();

router.get('/', async (req, res) => {
    let product = await products;
    const { limit } = req.query;

    product = limit ? product.slice(0, limit) : await product;

    io.on('connection', socket => {
        console.log(`Nuevo cliente conectado`)
    })

    res.render("home.handlebars", {
        product: await product,
        style: "/index.css",
        title: "Los mejores mangas"
    });
});

router.post("/", async (req, res) => {
    const { title, volume, editorial, author, description, price, thumbnail, stock, status, category } = req.body;
    const newProduct = { title, volume, editorial, author, description, price, thumbnail, stock, status, category }
    res.status(201).json({message: 'Producto creado'})
    let product = await productos.addProduct(newProduct);
    io.emit('updatedProduct', product);
})

router.delete("/:pid", async (req,res) => {
    const { pid } = req.params
    let products = await productos.deleteProduct(pid);
    res.status(201).json({ "message": "Producto borrado" })
    io.emit('deletedProducts', products)
})

export default router;