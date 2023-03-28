import jwt from "jsonwebtoken";
import { secretKey } from "../config/index.js";

export const generateToken = (user) => {
    const token = jwt.sign({user}, secretKey, { expiresIn:'60s'});
    return token;
}

export const authToken = (req,res, next) => {
    const authHeaders = req.headers.authorization;
    if(!authHeaders){
        return res.status(401).json({error: 'No estás autenticado'})
    }
    const token = authHeaders.split(' ')[1];

    jwt.verify(token, secretKey, (error, credentials) => {
        if(error){
            return res.status(403).json({error: 'No estás autorizado'})
        }
        req.user = credentials.user

        next();
    })
}