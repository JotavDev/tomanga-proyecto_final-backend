import * as dotenv from "dotenv";
dotenv.config("/.env");

let port = process.env.PORT;

export default port;