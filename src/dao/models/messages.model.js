import mongoose, { Schema } from "mongoose";

const messageCollection = "message";

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    index: true,
  },
  message: String,
});

const messengerModels = mongoose.model(messageCollection, messageSchema);

export default messengerModels;