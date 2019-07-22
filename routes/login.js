/**
 * @api {post} /login Login de usuário na API
 * @apiName PostLogin
 * @apiGroup Usuarios
 *
 * @apiParam {String} usuario Nome do usuário.
 * @apiParam {String} senha   Senha do usuário.
 * @apiParam {String} id_loja ID da loja onde o usuário estará logado.
  *
 * @apiSuccess {Boolean} success Retorna sempre <code>true</code>, indicando sucesso no login.
 * @apiSuccess {String}  token   Token do usuário a ser usado nas próximas requisições.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiJKICAiLCJpZExvamEiOiIwMCIsImlhdCI6MTU1MTgwODY3OSwiZXhwIjoxNTUxODk1MDc5fQ.JaVTco1LPPK5BVhIhIdpvq4vSlUucJEzzQyxT1u8YqY"
 *    }
 *
 * @apiError {Boolean} success Retorna sempre <code>false</code>, indicando falha no login.
 * @apiError {String}  message Mensagem de erro do login.
 *
 * @apiErrorExample Erro:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "success": false,
 *       "message": "Usuário ou senha inválido!"
 *     }
 */

const createError = require('http-errors')
const Usuario = require('../models/usuario')

module.exports = (app) => {

  const path = app.get('path-api')

  app.post(path + '/login', (req, res, next) => {

    const user = new Usuario()
    user.authenticate(req.body)
      .then( () => {
        const token = Usuario.generateToken({
          idUser: user.data.id,
          idLoja: req.body.loja
        })
        res.status(200).json({ success: true, token })
      })
      .catch(error => next(error))

  })



  app.use(path , (req, res, next) => {

    let token = req.headers.authorization || req.body.token || req.query.token

    if ( /^\/lojas/.test(req.path) ) {
      next()
      return
    }

    if (!token) 
      throw new createError.BadRequest('Falta informar o token!')
    
    token = token.replace('Bearer ', '')

    Usuario.validateToken(token)
      .then( ({ usuario, idLoja }) => {
        req.login = {usuario, idLoja }
        next() 
      })
      .catch(error => next(error))

  })


  app.get(path + '/token', (req, res, next) => {

    res.status(200).json({
      sucess: true,
      idUser: req.login.usuario.data.id,
      idLoja: req.login.idLoja
    })

  })

}