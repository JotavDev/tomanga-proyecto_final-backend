import Router from 'express';
import passport from 'passport';
import User from '../dao/models/user.model.js';
import { createHash, isValidPassword} from '../utils/cryptPassword.js'

const router = Router();

router.post('/', passport.authenticate('register', {failureRedirect: '/failRegister'}), async (req,res) => {
    try{
        res.json({message: 'Usuario registrado'})
        // const { first_name, last_name, age, email, password } = req.body

        // const newUserInfo = {
        //     first_name,
        //     last_name,
        //     age,
        //     email,
        //     password: createHash(password)
        // }
    
        // const newUser = await User.create(newUserInfo);
    
        // res.status(201).json({message: 'Usuario creado', user: newUser})
    } catch(error){
        if(error.code === 11000){
            return res.status(400).json({error: 'El usuario ya existe'})
        }
        res.status(500).json({error: 'Error interno del servidor'})
    }
})

router.get('/failRegister', (req,res) => {
    console.log('Falló el registro')
    res.render({error: 'Falló'})
})

export default router;
