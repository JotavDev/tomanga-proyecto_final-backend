import * as dotenv from "dotenv";
dotenv.config("src/.env");

let port = process.env.PORT;

export default port;