import Router from 'express';
import User from '../dao/models/user.model.js'

const router = Router();

// Login
router.post('/', async (req,res) => {
    try{
        const { email, password } = req.body

        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            req.session.user = {
                first_name: 'Admin',
                last_name: '',
                age,
                email,
                password,
                admin: true
            }
            return res.json({message: 'Sesión iniciada como administrador'})
        }

        const user = await User.findOne({ email })
        if(!user || user.password !== password){
            return res.status(400).json({error: 'El usuario y la contraseña no coinciden'})
        }

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }

        res.json({message: 'Sesión iniciada'})
    } catch(error){
        res.status(500).json({error: error.message})
    }
})

// Logout
router.get('/logout', (req,res) => {
    req.session.destroy(error => {
        if(error){
            return res.json({error})
        } else {
            res.redirect('/login')
        }
    })
})

// Obtener sesión
router.get('/', (req,res) => {
    const user = req.session.user
    res.json({user})
})

export default router;