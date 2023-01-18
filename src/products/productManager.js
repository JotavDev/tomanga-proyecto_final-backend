import fs from "fs";

export default class ProductManager{

    constructor(){
        this.path = './src/products/products.json';
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }
        return []
    }

    addProduct = async (newProduct) => {
        const products = await this.getProducts();

        let lastId = products.length !== 0 ? products[products.length - 1].id : 0;
        newProduct.id = ++lastId

        newProduct.title && newProduct.volume && newProduct.editorial && newProduct.author && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.stock && newProduct.status && newProduct.category
        ? products.push(newProduct) 
        : console.log("Tienes que incluir toda la información de este artículo")

        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return newProduct;
    }

    getProductById = async (id) => {
        let products = await this.getProducts();
        let product = products.find((item) => item.id == id)
        return product ? product : (product = { error: "El producto no existe"});
    }

    updateProduct = async (idProd, infoProduct) => {
        let products = await this.getProducts();
        let product = products.findIndex((item) => item.id === Number(idProd));
        let id = products[product].id;
        products[product] = { ...infoProduct, id };

        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        let productoBorrado = products.filter((prod) => prod.id !== Number(id));
        await fs.promises.writeFile(this.path, JSON.stringify(productoBorrado));
    }
}

const productos = new ProductManager();