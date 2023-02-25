import Router  from 'express';
import ProductManager  from '../dao/mongo/products/productManager.mongo.js';
import {io} from '../app.js'

const products = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await products.find(req);
    res.json(response);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await products.findById(pid);
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error, message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, volume, editorial, author, description, price, thumbnail, stock, status, category } = req.body;
    if (!title || !price) {
      throw new Error("Debes ingresar todos los parametros");
    }
    const product = {
      title, 
      volume, 
      editorial, 
      author, 
      description, 
      price, 
      thumbnail, 
      stock, 
      status: true, 
      category
    };
    const response = await products.create(product);

    const allProducts = await products.find(req);
    console.log(allProducts, "esto es all products");
    io.emit("newProducts", allProducts);
    res.status(201).json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const response = await products.delete();
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await products.deleteById(pid);
    const allProducts = await products.find(req);

    io.emit("newProducts", allProducts);

    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;