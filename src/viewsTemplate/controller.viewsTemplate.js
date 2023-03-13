import Router from 'express';

const router = Router();

// Esto es signup
router.get('/signup', (req,res) => {
    res.render('signup.handlebars', {
        title: "| Regístrate",
        style: "/index.css" 
    })
})

// De aquí abajo es login
function publicAccess(req,res,next){
    if(req.session.user){
        return res.redirect('/')
    }
    next()
}

router.get('/login', publicAccess,(req,res) => {
    res.render('login.handlebars', {
        title: "| Login",
        style: "/index.css"
    })
})

// De aquí abajo es perfil
function privateAccess(req,res,next){
    if(!req.session.user){
        return res.redirect('/login')
    }
    next()
}

router.get('/', privateAccess ,(req,res) => {
    const { user } = req.session
    res.render('profile.handlebars', {
        user,
        title: '| Perfil',
        style: '/index.css'
    })
})

// Forgot Password
router.get('/auth/forgotPassword', (req,res) => {
    res.render('forgotPassword', {
        style: "/index.css",
        title: " | Restaurar contraseña"
    })
})

export default router;