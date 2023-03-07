import Router  from 'express';

const router = Router();

// Validación de admin
router.get('/login', (req,res) => {
    const {email, password} = req.query;

    if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
        req.session.user = user
        req.session.admin = true
        return res.json({message: 'Sesión iniciada'})
    }
    res.json({message: 'No tienes los permisos de acceso'})
})

export default router;