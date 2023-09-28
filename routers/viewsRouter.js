const { Router } = require('express');
const viewsRouterFn = (io) => {
    const viewsRouter = Router()
    const userNames = []

    viewsRouter.get('/loginChat', (req, res) => {
        return res.render('login')

    })
    viewsRouter.post('/loginChat', (req, res) => {
        const user = req.body
        const username = user.name
        userNames.push(username)
        //io.emit('newUser', username)
        return res.redirect(`/chat?username=${username}`)
    })
    viewsRouter.get('/chat', (req, res) => {
        res.render('chat')
    })

    viewsRouter.get('/register', (req, res) => {
        res.render('registration', { Title: "Registro" })
    })
    viewsRouter.get('/login', (req, res) => {
        res.render('userLogin', { Title: "login" })
    })


    return viewsRouter
}
module.exports = viewsRouterFn




/* module.exports = viewsRouter */
