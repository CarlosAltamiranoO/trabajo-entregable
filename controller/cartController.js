const CartManager = require('../dao/cartMMongo')

class CartController {
    constructor() {
        this.Manager = new CartManager()
    }

    async addCart(req, res) {
        const respuesta = await this.Manager.addcart()
        res.json(respuesta)
    }
    async getCartProduct(req, res) {
        try {
            const cartId = req.params.cid
            let respuesta = await this.Manager.getCart(cartId)
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
    }
    async addtoCart(req, res) {
        const cid = req.params.cid
        const pid = req.params.pid
        const respuesta = await this.Manager.addToCart(cid, pid)
        res.json(JSON.stringify(respuesta))
    }

    async deleteCart(req, res) {
        try {
            const cartId = req.params.cid
            let respuesta = await this.Manager.deleteCart(cartId)
            res.json(JSON.stringify(respuesta))
        } catch (error) {
            res.json(JSON.stringify('Los datos ingresados son incorrectos'))
        }
    }

    async deleteCartProduct(req, res) {
        try {
            const cartId = req.params.cid
            const productId =req.params.pid
            let respuesta = await this.Manager.deleteProductCart(cartId, productId)
            res.json(JSON.stringify(respuesta))
        } catch (error) {
            res.json(JSON.stringify('Los datos ingresados son incorrectos'))
        }
    }
}
module.exports = CartController