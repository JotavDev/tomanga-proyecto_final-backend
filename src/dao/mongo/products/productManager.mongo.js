import productsModel from "../../models/products.model.js";
import fs from "fs";

export default class productManager {
  processData(products, req) {
    const documents = products.docs.map(
      ({
        _id,
        title,
        volume,
        editorial,
        author,
        description,
        price,
        thumbnail,
        stock,
        status,
        category,
        id,
      }) => ({
        _id,
        title,
        volume,
        editorial,
        author,
        description,
        price,
        thumbnail,
        stock,
        status,
        category,
        id,
      })
    );

    const { totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage } =
      products;
    const prevUrl = `${req.protocol}://${req.get("host")}${
      req.baseUrl
    }?${new URLSearchParams({ ...req.query, page: page - 1 })}`;
    const nextUrl = `${req.protocol}://${req.get("host")}${
      req.baseUrl
    }?${new URLSearchParams({ ...req.query, page: page + 1 })}`;

    const response = {
      status: "succes",
      payload: documents,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasNextPage,
      hasPrevPage,
      prevLink: prevPage ? prevUrl : null,
      nextLink: nextPage ? nextUrl : null,
    };

    return response;
  }

  async find(req) {
    try {
      const status = req.query.status;
      const category = req.query.category;
      const title = req.query.title;
      const query = status
        ? { status: status }
        : category
        ? { category: category }
        : title
        ? { title: title }
        : {};
      console.log(query)
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 12,
        sort: req.query.sort || "",
      };
      const products = await productsModel.paginate(query, options);
      const response = this.processData(products, req);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async findById(pid) {
    try {
      const response = await productsModel.findOne({ id: pid });
      if (response == null) {
        throw new Error({
          status: 404,
          message: `El producto con id ${pid} no existe`,
        });
      }
      return { status: 200, message: response };
    } catch (error) {
      return error.message;
    }
  }

  async create(prod) {
    try {
      const lastDoc = await productsModel.findOne().sort({ id: -1 });
      let newId = 1;
      if (lastDoc) {
        newId = lastDoc.id + 1;
      }
      const newProd = { id: newId, ...prod };
      await productsModel.create(newProd);
      return { status: 200, message: "El producto fue creado correctamente" };
    } catch (error) {
      return error;
    }
  }

  file = `${process.cwd()}/files/product.json`;

  async createMany() {
    console.log(this.file);
    if (fs.existsSync(this.file)) {
      const data = await fs.promises.readFile(this.file);
      const response = JSON.parse(data);
      console.log(response);
      return response;
    }
    return "no se encuentra el archivo";
  }

  async delete() {
    try {
      const product = await productsModel.deleteMany();
      console.log(product, "ven fijate");
      if (product.deletedCount == 0) {
        throw new Error({
          status: 404,
          message: "no hay productos para borrar",
        });
      }
      return { status: 204, message: "productos eliminados" };
    } catch (error) {
      return error.message;
    }
  }

  async deleteById(pid) {
    try {
      const product = await productsModel.deleteOne({ _id: pid });
      if (product.deletedCount == 0) {
        throw new Error({
          status: 404,
          message: `El producto con id ${pid} no existe`,
        });
      }
      return { status: 204, message: `El producto ${pid} fue aliminado` };
    } catch (error) {
      return error.message;
    }
  }
}