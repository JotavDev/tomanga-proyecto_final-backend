import { Router } from "express";
import { authToken } from "../utils/jwt.utils.js";

const router = Router();

router.get('/private', authToken,(req, res) => {
    res.json({ message: 'Esto es privado' });
});

export default router;