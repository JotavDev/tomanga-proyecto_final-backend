import * as dotenv from "dotenv";
dotenv.config({path: ".env"});

export let port = process.env.PORT;
export let secret = process.env.SECRET_SESSION_STORAGE;