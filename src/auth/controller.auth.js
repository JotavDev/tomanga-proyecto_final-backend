import Router from 'express';
import passport from 'passport';
import User from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils/cryptPassword.js';
import { generateToken, authToken } from '../utils/jwt.utils.js';

const router = Router();

// Login
router.post('/', passport.authenticate('login', {failureRedirect: '/failLogin'}) ,async (req,res) => {
    try{
        if(!req.user){
            return res.status(400).json({error: 'El usuario y la contraseña no coinciden'})
        } else {
            req.session.user = {
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                age: req.user.age,
                email: req.user.email,
            }

            res.json({message: req.user})
        }

    } catch(error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// Fail Login
router.get('/failLogin', (req,res) => {
    res.json({message: 'No se pudo iniciar sesión'})
})

// Entrar con Github
router.get('/github', passport.authenticate('github', {scope:['user: email']}), async (req,res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req,res) => {
    req.session.user = req.user;
    res.redirect('/products')
})

// Entrar con Google
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile'] }),
    async (req, res) => {}
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
  }
);

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

// Forgot password
router.patch('/forgotPassword', async (req,res) => {
    try{
        const {email, password} = req.body

        const passwordEncrypted = createHash(password)
        await User.updateOne({email}, {password: passwordEncrypted})

        res.json({message: "Contraseña actualizada"})
    } catch(error){}
})

// Obtener sesión
router.get('/', (req,res) => {
    const user = req.session.user
    res.json({user})
})

export default router;