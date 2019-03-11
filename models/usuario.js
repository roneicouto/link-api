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


  async setData(user) {

    let {rows} = await db.query('SELECT * FROM vs_api_usuarios_lojas WHERE id_usuario = $1', [user.id])
    
    user.lojas = []
    rows.forEach(r => user.lojas.push(r.id_loja))

    return user

  }


  async authenticate(json) {

    if (!(json.usuario && json.senha && json.loja)) 
      throw new createError.BadRequest('Usuário ou senha ou loja não foi informado(s)!')
    
    let found = await this.findByField('nome', '=', json.usuario)

    if (!found || this.data.senha !== utils.md5(this.data.nome + json.senha))
      throw new createError.Unauthorized('Usuário ou senha inválidos!')

    if (! this.data.id_vendedor || ! /\d/.test(this.data.id_vendedor)) 
        throw new createError.BadRequest('ID do vendedor não consta no cadastro do usuário!')        
      
    return this.validateLoja(json.loja)
  
  }
 

  async validateLoja(idLoja) {

    let loja = await Loja.getInstance(idLoja)

    if (! loja.data) 
      throw new createError.NotFound('Loja ' + idLoja + ' inexistente!')

    if (this.data.id_nivel > 0 && ! this.data.lojas.includes(idLoja)) 
      throw new createError.Unauthorized('Acesso não permitido para a loja ' + idLoja + ' !')

    return true

  }

  
  static getInstance(value, field) {
    return Cadastro.getInstance(Usuario, value, field)
  }


  static async validateToken(token) {
    
    let payload = await Usuario.decodeToken(token)
    if (! payload) 
      throw new createError.BadRequest('Token inválido!')
    
    let user = await Usuario.getInstance(payload.idUser)
    if (! user.data) 
      throw new createError.BadRequest('Usuário ' + payload.idUser + ' inexistente!')
    
    await user.validateLoja(payload.idLoja)
    
    return {
      success: true,
      usuario: user,
      idLoja: payload.idLoja
    }

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
