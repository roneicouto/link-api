const createError = require('http-errors')
const Usuario = require('../models/usuario')

module.exports = (app) => {
  const route = app.route(app.get('path-api') + '/login')

  route.post( function(req, res, next) {
    let user = new Usuario()
    user.authenticate(req.body)
      .then( () => {
        let token = Usuario.generateToken({
          idUser: user.data.id,
          idLoja: req.body.loja
        })
        res.status(200).json({ success: true, token })
      })
      .catch(error => next(error))
  })

  app.use(app.get('path-api'), (req, res, next) => {
    let token = req.headers.authorization || req.body.token || req.query.token
    if (!token) {
      throw new createError.BadRequest('Falta informar o token!')
    }
    token = token.replace('Bearer ', '')
    Usuario.validateToken(token)
      .then(login => {
        req.login = login
        next() 
      })
      .catch(error => next(error))
  })

}