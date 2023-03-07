import Router from 'express';

const router = Router();

router.get('/', (req, res) => {
    // const cookies = req.cookies
    // res.send(cookies)
    res.render('login.handlebars', {
        title: "| Login",
        style: "/index.css"
    })
})

router.post('/', (req,res) => {
    const user = req.body

    res.cookie('userInfo', JSON.stringify(user), {maxAge: 5000}).json({message: 'Cookie creada'})
})

export default  router;