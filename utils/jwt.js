import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'jwtsecret'
const fenerateToken = (payload) => {
    const token = jwt.sing ({user: payload}, PRIVATE_KEY, {expiresIn: '24'})
    return token
}
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, PRIVATE_KEY, (err, payload) => {
            if (err) {
                return reject(err)
            }
            return resolve(payload)

        })
    })
}
module.exports = { verifyToken, verifyToken}