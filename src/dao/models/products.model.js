import mongoose from 'mongoose';

const productsCollection = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    volume: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: Array,
        unique: false
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        index: true
    },
    category: {
        type: String,
        required: true
    },
})

const productsModel = mongoose.model(productsCollection, productSchema)

export default productsModel;