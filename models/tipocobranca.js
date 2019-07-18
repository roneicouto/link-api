const Cadastro = require('../classes/cadastro')

module.exports = class TipoCobranca extends Cadastro {

  constructor() {
    super('vs_api_tipos_cobrancas')
  }

}
