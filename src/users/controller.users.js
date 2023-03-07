import Router from 'express';
import User from '../dao/models/user.model.js';

const router = Router();

router.post('/', async (req,res) => {
    try{
        const { first_name, last_name, age, email, password } = req.body
        const newUserInfo = {
            first_name,
            last_name,
            age,
            email,
            password
        }
    
        const newUser = await User.create(newUserInfo);
    
        res.status(201).json({message: 'Usuario creado', user: newUser})
    } catch(error){
        if(error.code === 11000){
            return res.status(400).json({error: 'El usuario ya existe'})
        }
        res.status(500).json({error: 'Error interno del servidor'})
    }
})
export default router;