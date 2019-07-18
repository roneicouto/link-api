const Cadastro = require('../classes/cadastro')

module.exports = class OpComercial extends Cadastro {

  constructor() {
    super('vs_api_op_comercial')
  }

  static getInstance(idOpCom) {
    return Cadastro.getInstance(OpComercial, idOpCom)
  }
}