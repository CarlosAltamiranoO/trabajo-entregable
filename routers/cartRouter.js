const { Router } = require('express')
const CartController = require('../controller/cartController')

const cartRouter = Router()
const controller = new CartController()

cartRouter.get('/', async (req, res) => {
    res.render('carrito', {
        title: "carrito"
    })
})

cartRouter.post('/', controller.addCart.bind(controller))

cartRouter.get('/:cid', controller.getCartProduct.bind(controller))

cartRouter.post('/:cid/product/:pid', controller.addtoCart.bind(controller))

cartRouter.delete('/:cid', controller.deleteCartProduct.bind(controller))

cartRouter.delete('/:cid/product/:pid', controller.deleteCartProduct.bind(controller))


module.exports = cartRouter










/* //const cartManager = require('../dao/cartsM')
const cartManager = require('../dao/cartMMongo')
//const manager = new cartManager('./data/carts.json')
const manager = new cartManager()


cartRouter.post('/', async (req, res) => {
    const respuesta = await manager.addcart()
    res.json(respuesta)
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        
        let respuesta = await manager.getCart(cartId)
        const productsCart = respuesta.products.map(aux => aux.toObject())
        res.render('idCarts', {
            pageTitle: "productos del carrito",
            hayProductos: respuesta.products.length > 0,
            productsCart,
            cartId: cartId
        })
    } catch (error) {
        console.log(error)
        res.send('Los datos ingresados son incorrectos')
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {

    const cid = req.params.cid
    const pid = req.params.pid
    const respuesta = await manager.addToCart(cid, pid)
    res.json(JSON.stringify(respuesta))
})

cartRouter.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        let respuesta = await manager.deleteCart(cartId)
        res.json(JSON.stringify(respuesta))
    } catch (error) {
        res.json(JSON.stringify('Los datos ingresados son incorrectos'))
    }
})
cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId =req.params.pid
        let respuesta = await manager.deleteProductCart(cartId, productId)
        res.json(JSON.stringify(respuesta))
    } catch (error) {
        res.json(JSON.stringify('Los datos ingresados son incorrectos'))
    }
})
 */

