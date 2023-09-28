const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    user: String,
    message: String
}, { versionKey: false })

module.exports =mongoose.model('chat', chatSchema)