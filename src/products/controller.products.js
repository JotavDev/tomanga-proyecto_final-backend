import Router from 'express';
import ProductManager  from '../../productManager.js';

const router = Router();
const productos = new ProductManager();
let products = productos.getProducts();

router.get("/", async (req, res) => {
    let product = await products;
    const { limit } = req.query;
    limit ? res.send(await product.slice(0, limit)) : res.send(await product);
})

router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const prod = await productos.getProductById(pid);
    res.send(prod);
})

router.post("/", (req, res) => {
    const { title, volume, editorial, author, description, price, thumbnail, stock, status, category } = req.body;
    const newProduct = { title, volume, editorial, author, description, price, thumbnail, stock, status, category }
    productos.addProduct(newProduct);
    res.status(201).json({message: 'Producto creado'})
    console.log(newProduct)
})

router.put("/:pid", (req, res) => {
    const { pid } = req.params
    const { title, volume, editorial, author, description, price, thumbnail, stock, status } = req.body
    const infoProduct = { title, volume, editorial, author, description, price, thumbnail, stock, status }
    productos.updateProduct(pid, infoProduct);
    res.status(201).json({ "message" : "Producto actualizado" })
})

router.delete("/:pid", (req, res) => {
    const { pid } = req.params
    productos.deleteProduct(pid);
    console.log(pid)
    res.status(201).json({ "message": "Producto borrado" })
})

export default router;