import * as dotenv from "dotenv";
dotenv.config({path: ".env"});

export let port = process.env.PORT;
export let secret = process.env.SECRET_SESSION_STORAGE;
export let githubID = process.env.GITHUB_ID;
export let githubSecret = process.env.GITHUB_SECRET;
export let googleID = process.env.GOOGLE_ID;
export let googleSecret = process.env.GOOGLE_SECRET;