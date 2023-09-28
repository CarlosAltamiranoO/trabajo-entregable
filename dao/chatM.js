const chatModel = require('./models/chatModel');

class chatManager {
    constructor() {
        this.model = chatModel
    }
    async getMessages() {
        return this.model.find().lean()
    }

    async addMessage(body) {
        try {
            return this.model.create({
                user: body.user,
                message: body.message
            })
            
        } catch (error) {
            throw error
        }
        
    }
}
module.exports = chatManager