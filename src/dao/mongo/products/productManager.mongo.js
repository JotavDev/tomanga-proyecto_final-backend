import productsModel  from '../../models/products.model.js';
import fs from 'fs'

export default class ProductManager{

    async find() {
        try{
            const product = await productsModel.find()
            return product;
        } catch(error){
            return error;
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

    async create(prod){
        try{
            const lastDoc = await productsModel.findOne().sort({id:-1})
            let newId = 1
            if(lastDoc){
                newId = lastDoc.id + 1
            }
            const newProd = { id: newId, ...prod };
            await productsModel.create(newProd);
            return '¡Producto creado satisfactoriamente!'
        } catch(error){
            return error;
        }
    }

    file = `${process.cwd()}/src/products/products.json`;

    async createMany() {
        console.log(this.file);
        if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file);
        const response = JSON.parse(data);
        console.log(response);
        return response;
        }
        return "No se encuentra el archivo";
    }

    async delete(){
        try{
            await productsModel.deleteMany();
            return 'Tus productos fueron eliminados'
        } catch(error){
            return error;
        }
    }
}