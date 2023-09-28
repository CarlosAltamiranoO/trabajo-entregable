const { Router } = require('express')
const passport = require('passport')

const sessionRouter = new Router()

sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
  return res.send(req.user)

}) //
sessionRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
  return res.redirect('/api/products')

})
sessionRouter.get('/datos', (req, res) => {
  // Accede a los datos de sesión y envíalos al cliente
  const datosDeSesion = req.session;
  res.json(datosDeSesion);
})






module.exports = sessionRouter