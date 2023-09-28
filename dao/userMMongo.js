const userModel = require('./models/userModel')

class UserManager {
    constructor() {
        this.model = userModel
    }
    async getUserByEmail(Email) {
        return this.model.findOne({ email: Email })
    }
    async getCartById(id) {
        return this.model.findById(id)
    }
    async addUser(body) {
        try {
            return this.model.create({
                name: body.name,
                email: body.email,
                password: body.password
            })

        } catch (error) {
            throw error
        }
    }
    async addCardUser(userId, CartId) {
        try {
            await userModel.updateOne({ _id: userId},{ cart: CartId })
        } catch (error) {
            throw error
        }
    }
    async getUserById(id) {
        const aux = await this.getUserById(id)
        if (!aux) return 'El usuario no existe'
        return  await userModel.findById({_id: id}).populate('cart')
    }
}
module.exports = UserManager