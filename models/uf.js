const utils = require('../utils/utils')
const Cadastro = require('../classes/cadastro')
const inscEstadual = require('inscricaoestadual')

module.exports = class UF extends Cadastro {

  constructor() {
    super('vs_api_uf', 'sigla')
  }

  
  static async exists(sigla) {
    let uf = await UF.getInstance(sigla)
    return ! utils.isEmptyObject(uf)
  }


  static getInstance(uf) {
    return Cadastro.getInstance(UF, uf)
  }

  static inscricaoEstadualValida(insc, uf) {
    return inscEstadual(insc, uf)
  }
  
}
