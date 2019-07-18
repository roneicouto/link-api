const Cadastro = require('../classes/cadastro')

module.exports = class PosicaoPreVenda extends Cadastro {

  constructor() {
    super('vs_api_posicoes_pv')
  }


  static getInstance(idPos) {
    return Cadastro.getInstance(PosicaoPreVenda, idPos)
  }

}
