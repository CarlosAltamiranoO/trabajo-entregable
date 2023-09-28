const express = require('express')
const productRouter = require('../routers/productRouter')
const cartRouter = require('../routers/cartRouter')
const viewsRouterFn = require('../routers/viewsRouter');
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const chatManager = require('../dao/chatM')
const passport = require('passport')
const initializePassport = require('../config/passportConfig')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const sessionRouter = require('../routers/sessionRouter')
const session = require('express-session')
const dbCong = require('../config/dbConfig.js')

const PORT = 8080
//const MONGODB_CONNECTION = 'mongodb+srv://CarlosA:lcessei2023@cluster0.hnpzkrb.mongodb.net/ecomerce?retryWrites=true&w=majority'
const MONGODB_CONNECTION = `mongodb+srv://${dbCong.db_user}:${dbCong.db_password}@${dbCong.db_host}/${dbCong.db_name}?retryWrites=true&w=majority`
const app = express()

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')




mongoose.connect(MONGODB_CONNECTION)
    .then(() => console.log('conectado '))
    .catch((error) => console.log(error))

app.use(flash())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))


app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGODB_CONNECTION,
        ttl: 15
    }),
    secret: 'secretSession',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

const httpServer = app.listen(PORT, () => { console.log(`escuchando en puerto ${PORT}`) })
const io = new Server(httpServer)
const viewsRouter = viewsRouterFn(io)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/sessions', sessionRouter)
app.use('/', viewsRouter)

const manager = new chatManager()
const users = []


io.on('connection', socket => {
    console.log('nuevo cliente conectado', socket.id)
    socket.on('joinChat', async username => {
        console.log(username, socket.id)
        users.push({
            name: username,
            socketId: socket.id
        })
        socket.broadcast.emit('notification', `${username} se ha unido al chat`)
        socket.emit('notification', `Bienvenid@ ${username}`)
        socket.emit('messages', JSON.stringify(await manager.getMessages()))
    })
    socket.on('newMessage', message => {
        const user = users.find(user => user.socketId === socket.id)
        const newMessage = {
            user: user.name,
            message: message
        }
        manager.addMessage(newMessage)
        io.emit('message', JSON.stringify(newMessage))
    })
})


