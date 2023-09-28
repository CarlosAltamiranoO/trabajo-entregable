const dotenv = require('dotenv');

dotenv.config()


module.exports =  {
    db_user :process.env.DB_USER || 'prueba',
    db_host :process.env.DB_HOST || 'prueba',
    db_password: process.env.DB_PASSWORD || 'prueba',
    db_name : process.env.DB_NAME || 'prueba'
}