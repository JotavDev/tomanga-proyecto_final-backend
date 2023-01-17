import express from "express";
import port from './config/index.js';
import routes from "./routes/index.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

routes(app)

app.listen(port, () => {
    console.log(`Server running at the server ${port}`)
})