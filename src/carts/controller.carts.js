import Router from 'express';
import CartManager from './cartManager.js';
import ProductManager from '../products/productManager.js';

const router = Router();
const productos = new ProductManager();
const carts = new CartManager();
let cart = carts.getCarts();

router.get('/', async (req, res) => {
    let carts = await cart;
    const { limit } = req.query;
    limit ? res.send(await carts.slice(0, limit)) : res.send(await carts);
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await carts.getCartById(cid);
    res.send(cart.products);
});

router.post('/', (req, res) => {
    const { products } = req.body;
    let cart = { products };
    console.log(cart)
    carts.addCart(cart);

    res.status(201).json({ message: "Carrito creado"});
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const product = await productos.getProductById(pid);
    const prod = await carts.addProductToCart(cid, product);
    res.send(prod);
});

export default router;