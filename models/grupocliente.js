const Cadastro = require('../classes/cadastro')

module.exports = class GrupoCliente extends Cadastro {

  constructor() {
    super('vs_api_grupos_clientes')
  }

}
