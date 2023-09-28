const { AsyncLocalStorage } = require('async_hooks');
const { randomUUID } = require('crypto')
const fs = require('fs');

class cartsManager {
    constructor(path) {
        this.path = path
        this.carts = []
    }

    async getCarts() {
        try {
            const json = await fs.promises.readFile(this.path, 'utf-8')
            if (json === "") return true
            this.carts = JSON.parse(json)
            return false
        } catch (error) {
            console.error(error)
        }
    }
    async salveCarts() {
        try {
            const json = JSON.stringify(this.carts, null, 2)
            await fs.promises.writeFile(this.path, json)
            return true
        } catch (error) {
            console.error(error)
            return false

        }
    }

    async getcartById(id) {
        try {
            if (await this.getCarts()) return "no hay ningun carrito cargado"
            const cart = this.carts.find(((cart) => cart.id === id))
            if (cart === undefined) return "no existe el carrito solicitado"
            return cart
        } catch (error) {
            console.error(error)
        }

    }
    async addcart() {
        try {
            await this.getCarts()
            const newCart = { id: randomUUID(), products: [] }
            console.log(newCart)
            this.carts.push(newCart)
            if (await this.salveCarts()) return "se creo el carrito"
            else return " hubo un error al crear el carrito"

        } catch (error) {
            console.log(error)
        }
    }

    async #reemplazarElemento(id, nuevoElemento) {
        await this.getCarts()
        const indiceBuscado = this.carts.findIndex(c => c.id === id)
        if (indiceBuscado === -1) {
            throw new Error('id no encontrado')
        }
        this.carts[indiceBuscado] = nuevoElemento
        await this.salveCarts()
        return "reemplazado"
    }
    async addToCart(cid, pid) {
        try {
            const carrito = await this.getcartById(cid)
            if (carrito === "no existe el carrito solicitado") return "no existe el carrito solicitado"
            const existingProduct = carrito.products.find(product => product.id === pid)
            if (existingProduct) existingProduct.quantity += 1
            else carrito.products.push({ id: pid, quantity: 1 })
            await this.#reemplazarElemento(cid, carrito)
            return carrito

        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = cartsManager