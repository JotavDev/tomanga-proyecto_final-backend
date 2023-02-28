import cartsModel from '../../models/cart.model.js';
import ProductManager from '../products/productManager.mongo.js';

const product = new ProductManager();

export default class cartsManager {

  async find() {
    try {
      const products = await cartsModel.find();
      return {
        status: 200,
        message: products,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(cid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });

      if (cart == null) {
        throw new Error({
          status: 404,
          message: `El carrito con id ${cid} no existe`,
        });
      }
      return {
        status: 200,
        message: cart.products,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create() {
    try {
      await cartsModel.create({ products: [] });
      return {
        status: 201,
        message: "carrito fue creado",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteById(cid) {
    try {
      const cart = await cartsModel.deleteOne({ _id: cid });
      if (cart.deletedCount == 0) {
        throw new Error({
          status: 404,
          message: `El carrito con id ${cid} no existe`,
        });
      }
      return {
        status: 204,
        message: `carrito ${cid} eliminado`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Método para verificar existencia de los documentos en la collecion
  async CheckDocument(cid, pid) {
    const cart = await this.findById(cid);
    const prod = await product.findById(pid);
    if (!cart && !prod) {
      throw new Error({
        status: 404,
        message: `El carrito con id ${cid} y el producto con id ${pid} no existen`,
      });
    }
    if (!cart) {
      throw new Error({
        status: 404,
        message: `El carrito con id ${cid} no existe`,
      });
    }
    if (!prod) {
      throw new Error({
        status: 404,
        message: `El producto con id ${pid} no existe`,
      });
    }
    return true;
  }

  async addProdToCart(cid, pid) {
    try {
      await this.CheckDocument(cid, pid);
      const result = await cartsModel.updateOne(
        { _id: cid, "products.product": { $ne: pid } },
        { $addToSet: { products: { product: pid, qty: 1 } } }
      );
      if (result.modifiedCount === 0) {
        await cartsModel.updateOne(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.qty": 1 } }
        );
      }
      return {
        status: 204,
        message: `El producto ${pid} fue agregado a tu carrito`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProducts(cid, pid, qty) {
    try {
      await this.CheckDocument(cid, pid);
      await cartsModel.updateOne(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.qty": qty } }
      );
      return {
        status: 204,
        message: `La cantidad de productos se ha actualizado en: ${qty}`,
      };
    } catch (error) {
      return error.message;
    }
  }

  async deleteProduct(cid, pid) {
    try {
      await this.CheckDocument(cid, pid);
      await cartsModel.updateOne(
        { _id: cid, "products.product": pid },
        { $inc: { "products.$.qty": -1 } }
      );
      await cartsModel.updateOne(
        { _id: cid, "products.qty": { $eq: 0 } },
        { $pull: { products: { product: pid } } }
      );
      return {
        status: 204,
        message: `el producto ${pid} fue eliminado de tu carrito`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAllProducts(cid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (cart == null) {
        throw new Error({
          status: 404,
          message: `El carrito con id ${cid} no existe`,
        });
      } else {
        const response = await cartsModel.updateOne(
          { _id: cid },
          { $set: { products: [] } }
        );
      }
      return {
        status: 204,
        message: `Todos los productos fueron eliminados del carrito`,
      };
    } catch (error) {}
  }
}