import mongoose from "mongoose";
const userCollection = 'user'

const userSchema = new mongoose.Schema({
    googleid: String,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    age: {
        type: Date,
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    password: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model(userCollection, userSchema)

export default User;