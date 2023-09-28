//
const {Schema, model } = require ('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = Schema({
    code: {type:String, unique:true},
    title: String,
    description: String,
    category: String,
    thumbnail: [String],
    stock: Number,
    price: Number
}, {versionKey: false})
productSchema.plugin(mongoosePaginate)
module.exports = model('Product', productSchema)