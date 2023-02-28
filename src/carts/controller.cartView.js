import { Router } from "express";
import cartsManager from "../dao/mongo/cart/cartManager.mongo.js";

const router = Router();
const carts = new cartsManager();

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await carts.findById(cid);
    const products = response.message;
    res.render("cart.handlebars", {
      products: products,
      title: "| Carrito",
      style: "index.css",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;