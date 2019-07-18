const utils = require('../utils/utils')
const Cadastro = require('../classes/cadastro')

module.exports = class Loja extends Cadastro {

  constructor() {
    super('vs_api_lojas')
  }

  static async exists(idLoja) {
    let loja = await Loja.getInstance(idLoja)
    return ! utils.isEmptyObject(loja)
  }


  static getInstance(idLoja) {
    return Cadastro.getInstance(Loja, idLoja)
  }

  
}
