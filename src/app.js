import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io'
import port from './config/index.js';
import routes from './routes/index.js';
import __dirname from './utils.js';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

routes(app)

const httpServer = app.listen(port, () => {
    console.log(`Server running at the server ${port}`)
})

export const io = new Server(httpServer)