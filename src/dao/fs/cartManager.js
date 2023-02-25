import fs from 'fs';

export default class CartManager{

    constructor(){
        this.path = './src/carts/carts.json'
    }
    
    getCarts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(data);
            return carts;
        }
        return []
    }

    getCartById = async (cid) => {
        let carts = await this.getCarts();
        let cart = carts.find((item) => item.id === Number(cid));        
        return cart ? cart : (cart = { error: "El producto no existe"});
    }

    addCart = async (products) => {
        const carts = await this.getCarts();

        let lastId = carts.length !== 0 ? carts[carts.length - 1].id : 0;
        products.id = ++lastId;

        carts.push(products);
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return products;
    }

    addProductToCart = async (cid, product) => {
        const carts = await this.getCarts();
        const cart = await this.getCartById(cid);

        const { id } = product;
        let idProd = { id };

        const indexProd = carts.findIndex((item) => item.id === Number(cid));
        const products = carts[indexProd].products;

        let inCart = products.find((item) => item.product === idProd.id);

        if(inCart){
            inCart.quantity++
        } else {
            products.push({ product: idProd.id, quantity: 1});
        }
        

        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return products;
    }
}