const passport = require('passport')
const local = require('passport-local')
//const userModel = require('../dao/models/userModel')
const { createHash, isValidPassword } = require('../utils/passwordHast')
//const cartModel = require('../dao/models/cartModel')
const userManager = require('../dao/userMMongo.js')
const cartManager = require('../dao/cartMMongo.js')

const LocalStrategy = local.Strategy
const ManagerU = new userManager()
const ManagerC = new cartManager()

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                //const exist = await userModel.findOne({ email: username })
                const exist = await ManagerU.getUserByEmail(username)
                console.log(exist, username)
                if (exist) {
                    console.log('ya existe')
                    return done(null, false)
                }
                const newUser = {
                    name: req.body.name,
                    email: username,
                    password: createHash(password)
                }
                //const usuario = await userModel.create(newUser)
                const usuario = await ManagerU.addUser(newUser)
                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, async (username, password, done) => {
            try {
                //const existe = await userModel.findOne({ email: username })
                const existe = await ManagerU.getUserByEmail(username)
                //console.log(existe.cart._id.toString())  // asi recuperas el id del carrito para utilizarlo
                if (!existe) {
                    return done(null, false, { message: 'no exixte el usuario' })
                }
                if (!isValidPassword(password, existe.password)) {
                    return done(null, false, { message: 'credenciales incorrectas' })
                }
                if (!existe.cart) {
                    //const newCart = await cartModel.create({ products: [] })
                    const newCart = await ManagerC.addcart()//revisar lo que resibe
                    //await userModel.updateOne({ _id: existe._id},{ cart: newCart._id })
                    await ManagerU.addCardUser(existe._id, newCart._id)
                }
                return done(null, existe)
            } catch (error) {
                console.log (error)
            }
        }
    ))
    passport.serializeUser((user, done) => {
        return done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        //const user = await userModel.findById(id).populate('cart')
        const user = await ManagerU.getCartById(id)

        return done(null, user)
    })

}


module.exports = initializePassport