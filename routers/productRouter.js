const { Router } = require('express')
const ProductController = require('../controller/productController')

const productRouter = Router()
const controller = new ProductController()

productRouter.get('/', (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login')
    }
    return next()
},  controller.getProducts.bind(controller))

productRouter.get('/:pid', controller.getProductById.bind(controller))

productRouter.post('/', controller.addProduct.bind(controller))

productRouter.delete('/:pid',controller.deleteProduct.bind(controller))

productRouter.post('/:pid',controller.updateProduct.bind(controller))

module.exports = productRouter



//const ProductManager = require('../dao/productM')
//const ProductManager = require('../dao/productMMongo')

//const manager = new ProductManager.ProductManager('./data/Products.json')
//const manager = new ProductManager()

/* productRouter.get('/', (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login')
    }
    return next()
}, async (req, res) => {

    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const params = { limit, page }
    const sort = req.query.sort
    if (req.query.sort) {
        params.sort = { price: parseInt(sort) }
    }
    (req.query.query) ? query = { category: req.query.query } : query = ""

    let productos = await manager.getProducts({ params, query })
    //if (limit) productos = productos.slice(0, parseInt(limit))
    res.render('Products', {
        title: "listar Productos",
        hayProductos: productos.docs.length > 0,
        productos,
    })
}) */
/* productRouter.get('/:pid', async (req, res) => {
    console.log(req.user)
    const productId = req.params.pid
    let product = await manager.getProductById(productId)
    res.render('idProduct', {
        pageTitle: "Productos por id",
        product,
    })
}) */
/* productRouter.post('/', async (req, res) => {
    try {
        const producto = req.body
        const respuesta = await manager.addProduct(producto)
        res.send(respuesta)
    } catch (error) {
        res.send('el producto ya esta cargado')
    }
}) */
/* productRouter.delete('/:pid', async (req, res) => {
    const productId = req.params.pid
    const respuesta = await manager.deleteProduct(productId)
    res.send(JSON.stringify(respuesta))
}) */
/* productRouter.post('/:pid', async (req, res) => { // agegado ya que no estaba al proncipio metodo para actualizar producto
    try {
        const { pid } = req.params
        const producto = req.body
        console.log(producto)
        const respuesta = await manager.updateProduct(pid, producto)
        console.log("respuesta", respuesta)
        res.send(respuesta)
    } catch (error) {
        res.send('el producto no exixte')
    }
}) */