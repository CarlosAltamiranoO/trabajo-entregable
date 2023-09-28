const { model, Schema } = require('mongoose')

const cartSchema = Schema({
    products: {
        type: [{ id: { type: Schema.Types.ObjectId, ref: 'Product'}, quantity: Number }]
    }
}, { versionKey: false })

module.exports = model('carts', cartSchema)














/* const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    id: String, quantity: Number},{ _id: false 
})

const cartSchema = mongoose.Schema({
    products: [productsSchema],
}, { versionKey: false })

module.exports =mongoose.model('carts', cartSchema) */