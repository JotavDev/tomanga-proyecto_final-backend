import express from 'express';
import expressHandlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { Server } from 'socket.io'
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { port } from './config/index.js';
import { secret } from './config/index.js'
import routes from './routes/index.js';
import __dirname from './utils.js';
import messageManager from './dao/mongo/messages/messageManager.mongo.js';

const app = express();
const messages = new messageManager();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.engine( "handlebars",
    expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}));
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

app.use(session({
    store:MongoStore.create({
        mongoUrl: 'mongodb+srv://javierAguirreV:Aysen6778@ecommerce.beidxat.mongodb.net/user-sessions?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser:true, useUnifiedTopology:true },
        ttl: 86400
    }),
    secret,
    resave: false,
    saveUninitialized: false
}))
app.use(cookieParser())

routes(app)

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://javierAguirreV:Aysen6778@ecommerce.beidxat.mongodb.net/?retryWrites=true&w=majority', error => {
    if(error){
        console.log(`No te conectaste a la base de datos. Error: ${error}`)
        process.exit()
    } 
})

const httpServer = app.listen(port, () => {
    console.log(`Server running at the server ${port}`)
})

export const io = new Server(httpServer)

io.on("connection", async (socket) => {
    console.log("Conexión exitosa");
    socket.on("message", async (data) => {
      const allMessages = await messages.find();
      console.log(allMessages, "desde app.js");
      io.emit("allMessages", allMessages.message);
    });
});