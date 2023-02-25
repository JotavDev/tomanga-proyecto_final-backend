import Router from 'express';
import CartManager from '../dao/mongo/cart/cartManager.mongo.js';

const router = Router();
const carts = new CartManager();

router.get('/', async (req, res) => {
    try{
        const response = await carts.find()
        res.json({result: 'sucess', payload: response})
    }catch(error){
        res.json({ error: error.message })
    }
});

router.get('/:cid', async (req, res) => {
    try{
        const { cid } = req.params;
        const response = await carts.findById(cid);
        res.json({ result: 'success', payload: response})
    } catch(error){
        res.json({ error: error.message})
    }
})

router.post('/', async (req,res) => {
    try{
        const response = await carts.create();
        res.json({ result: 'success', payload: response})
    }catch(error){
        res.json({ error: error.message})
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const response = await carts.addProdToCart(cid, pid);
  
      res.json({ result: "succes", payload: response });
    } catch (error) {
      res.json({ error: error.message });
    }
  });

  router.put("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { qty } = req.body;
      const response = await carts.updateProducts(cid, pid, qty);
      res.json({ response: response });
    } catch (error) {
      res.json({ error: error.message });
    }
  });

  router.delete("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const response = await carts.deleteProduct(cid, pid);
  
      res.json({ result: "succes", payload: response });
    } catch (error) {
      res.json({ error: error.message });
    }
  });

  router.delete("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const response = await carts.deleteAllProducts(cid);
      res.json({ response: response });
    } catch (error) {
      res.json({ error: error.message });
    }
  });

export default router;