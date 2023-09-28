const { model, Schema } = require('mongoose')

const userSchema = Schema({
    cart: { type: Schema.Types.ObjectId, ref: 'carts' },
    name: String,
    email: { type: String, unique: true },
    password: String
},
    { versionKey: false })

module.exports = model('users', userSchema)