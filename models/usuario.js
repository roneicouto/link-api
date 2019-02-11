const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const utils = require('../utils/utils')
const db = require('../utils/db')
const Cadastro = require('../classes/cadastro')
const Loja = require('./loja')
const secretKey = '(*N0rte/L1nk)'

module.exports = class Usuario extends Cadastro {

  constructor() {
    super('vs_api_usuarios')
  }


  setData(user) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM vs_api_usuarios_lojas WHERE id_usuario = $1', [user.id])
        .then(({ rows }) =>{
          user.lojas = []
          rows.forEach(r => user.lojas.push(r.id_loja))
          resolve(user)
        })
        .catch(error => reject(error))
    })
  }


  authenticate(json) {
    return new Promise((resolve, reject) => {
      if (!(json.usuario && json.senha && json.loja)) {
        throw new createError.BadRequest('Usuário ou senha ou loja não foi informado(s)!')
      }
      this.findByField('nome', '=', json.usuario)
        .then(found => {
          if (! (found && this.data.senha===utils.md5(this.data.nome + json.senha))) {
            throw new createError.Unauthorized('Usuário ou senha inválidos!')
          }
          return this.validateLoja(json.loja)
        })
        .then(ok => resolve(ok))
        .catch(error => reject(error)) 
    })
  }
 

  validateLoja(idLoja) {
    return new Promise((resolve, reject) => {
      Loja.getInstance(idLoja)
        .then(loja => {
          if (! loja.data) {
            throw new createError.NotFound('Loja ' + idLoja + ' inexistente!')
          }
          if (this.data.id_nivel > 0 && ! this.data.lojas.includes(idLoja)) {
            throw new createError.Unauthorized('Acesso não permitido para a loja ' + idLoja + ' !')
          }
          resolve(true)
        })
        .catch(error => reject(error))
    })
  }

  
  static getInstance(value, field = 'id') {
    return new Promise((resolve, reject) => {
      let user = new Usuario()
      user.findByField(field, '=', value)
        .then(found => resolve(found ? user : {}))
        .catch(error => reject(error))
    })
  }


  static validateToken(token) {
    return new Promise((resolve, reject) => {
      let payload = Usuario.decodeToken(token)
      if (! payload) {
        throw new createError.BadRequest('Token inválido!')
      }
      Usuario.getInstance(payload.idUser)
        .then(user => {
          if (! user.data) {
            throw new createError.BadRequest('Usuário ' + payload.idUser + ' inexistente!')
          }
          user.validateLoja(payload.idLoja)
            .then(ok => resolve({
              success: true,
              usuario: user.data,
              idLoja: payload.idLoja
            }))
            .catch(error => reject(error))
          })
        .catch(error => reject(error))
    })
  }


  static decodeToken(token) {
    let payload
    try {
      payload = jwt.verify(token, secretKey)      
    } catch (error) {
      payload = false
    }
    return payload
  }

  static generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1d' })
  }

}
