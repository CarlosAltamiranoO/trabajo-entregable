const productModel = require('./models/productModel')

class ProductManager {
    constructor() {
        this.model = productModel
    }
    async getProducts(req) {// ver si pasar param y ponerlo directamente en ves de todo 
        //return this.model.find().lean()
        //let aux = await this.model.paginate({}, {limit, page})
        let aux = await this.model.paginate(req.query, req.params)// recivir parametro para el ordenamiento acendente o decendente
        aux.docs = aux.docs.map(aux => aux.toObject())
        if (req.query )aux.category = req.query.category
        if (req.params.sort )aux.sort = req.params.sort.price
        return aux
    }

    async getProductById(id) {
        return this.model.findById(id).lean()
    }

    async addProduct(body) {
        try {
            return this.model.create({
                code: body.code,
                title: body.title,
                description: body.description,
                category: body.category,
                thumbnail: body.thumbnail,
                stock: body.stock,
                price: body.price
            })
            
        } catch (error) {
            throw error
        }
        
    }
    async updateProduct(id, body) {
        
        const product = await this.getProductById(id)
        if (!product) {
            throw new Error('Producto no existe')
        }
        const productUpdated = {
            _id: product._id,
            code: body.code || product.code,
            stock: body.stock || product.stock,
            title: body.title || product.title,
            price: body.price || product.price,
            description: body.description || product.description,
            thumbnail: body.thumbnail || product.thumbnail
        }
        await this.model.updateOne({ _id: id }, productUpdated)

        return productUpdated
    }

    async deleteProduct(id) {
        const product = await this.model.findById(id).lean()

        if (!product) {
            return 'Producto no existe'
        }

        await this.model.deleteOne({ _id: id })

        return 'se elimino el producto'
    }
}
module.exports = ProductManager