const Cadastro = require('../classes/cadastro')

module.exports = class Loja extends Cadastro {

  constructor() {
    super('vs_api_lojas')
  }


  static getInstance(idLoja) {
    return Caddastro.getInstance(Loja, idLoja)
  }

  
}
