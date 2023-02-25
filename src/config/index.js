import * as dotenv from "dotenv";
dotenv.config({path: ".env"});

let port = process.env.PORT;

export default port;