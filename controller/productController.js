
const ProductManager = require('../dao/productMMongo.js')

class ProductController {
    constructor () {
        this.Manager = new ProductManager()
    }

    async getProducts(req, res) {

        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const params = { limit, page }
        const sort = req.query.sort
        let query = ""

        if (req.query.sort) {params.sort = { price: parseInt(sort) }}
        if (req.query.query) { query = { category: req.query.query }}

        let productos = await this.Manager.getProducts({ params, query })
        res.render('Products', {
            title: "listar Productos",
            hayProductos: productos.docs.length > 0,
            productos,
        })
    }
    async getProductById (req, res) {

        const productId = req.params.pid

        let product = await this.Manager.getProductById(productId)
        res.render('idProduct', {
            pageTitle: "Productos por id",
            product,
        })
    }
    async addProduct(req, res) {
        try {
            const producto = req.body
            const respuesta = await this.Manager.addProduct(producto)
            res.send(respuesta)
        } catch (error) {
            res.send('el producto ya esta cargado')
        }
    }
    async deleteProduct(req, res) {
        const productId = req.params.pid
        const respuesta = await this.Manager.deleteProduct(productId)
        res.send(JSON.stringify(respuesta))
    }
    async updateProduct(req, res) {
        try {
            const { pid } = req.params
            const producto = req.body
            console.log(producto)
            const respuesta = await this.Manager.updateProduct(pid, producto)
            console.log("respuesta", respuesta)
            res.send(respuesta)
        } catch (error) {
            res.send('el producto no exixte')
        }
    }
}
module.exports = ProductController