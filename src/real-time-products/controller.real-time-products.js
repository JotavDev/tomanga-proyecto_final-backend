import { Router } from 'express';
import ProductManager  from '../products/productManager.js';
import  { io }  from 'socket.io-client'

const router = Router();
const productos = new ProductManager();
const socket = io()
let products = productos.getProducts();

router.get('/', async (req, res) => {
    let product = await products;
    const { limit } = req.query;

    product = limit ? product.slice(0, limit) : product;

    res.render("home.handlebars", {
        product: product,
        style: "/index.css",
        title: "Los mejores mangas"
    });

    socket.on('addProduct', async product => {
        products = product;
        res.render("home.handlebars", {
            product: product,
            style: "/index.css",
            title: "Los mejores mangas"
        });
    });
});

router.post('/', async (req, res) => {
    let product = await products;

    socket.emit('addProduct', product => {
        res.render("home.handlebars", {
            product: product,
            style: "/index.css",
            title: "Los mejores mangas"
        })
    })
}) 

export default router;