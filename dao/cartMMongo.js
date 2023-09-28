const cartModel = require('./models/cartModel')
const productModel = require('./models/productModel')


class cartstManager {
    constructor() {
        this.model = cartModel
        this.modelP = productModel
    }

    async getcartById(id) {
        return this.model.findById(id)
        //return this.model.findOne({_id: id}).populate('products.id')  res: product.id {objeto producto} product.quantity (cantidad)

    }
    async getCart(id){
        const cart = await this.getcartById(id);
        if (!cart) return 'El carrito no existe'

        let aux =  await this.model.findOne({_id: id}).populate('products.id')
        //aux.products = aux.products.map(aux => aux.toObject())
        return aux
    }
    async addcart() {
        try {
            const respuesta = await this.model.create({ products: [] })
            //return JSON.stringify(respuesta._id)
            return respuesta
        } catch (error) {
            throw error
        }
    }

    /* async addToCart(cid, pid) {
        let proId = false
        const cart = await this.getcartById(cid)
        
        if (!cart) return 'carrito no existe'

        cart.products.map((producto) => {
            let auxId = JSON.stringify(producto.id)
            let id = JSON.stringify(pid)
            if (auxId === id) {
                producto.quantity++
                proId = true
            }
        })
        if (!proId) cart.products.push({ id: pid, quantity: 1 })
        await this.model.updateOne({ _id: cid }, cart)
        return cart.products
    } */
    async addToCart(cid, pid) {
        const cart = await this.getcartById(cid);

        if (!cart) return 'El carrito no existe'

        const productIndex = cart.products.findIndex(producto => producto.id.equals(pid))

        if (productIndex !== -1) cart.products[productIndex].quantity++
        else cart.products.push({ id: pid, quantity: 1 })

        await this.model.updateOne({ _id: cid }, cart);
        return cart.products;
    }


    async deleteCart(cid) {
        const cart = await this.getcartById(cid)
        if (!cart) return 'carrito no existe'

        await this.model.updateOne({ _id: cid }, { $set: { "products": [] } })
        return "se vacio el carrito"
    }
    async deleteProductCart(cid, pid) {
        const cart = await this.getcartById(cid)
        if (!cart) return 'carrito no existe'
        const productIndex = cart.products.findIndex(producto => producto.id.equals(pid))

        if (productIndex !== -1) cart.products.splice(productIndex, 1)

        await this.model.updateOne({ _id: cid }, cart)
        return "se elimino el producto"
    }
    async updateCart(cid, products) {
        const cart = await this.getcartById(cid)
        if (!cart) return 'carrito no existe'

        await this.model.updateOne({ _id: cid }, { $set: { "products": products } })
        return "se actualizo el carrito"
    }
}
module.exports = cartstManager