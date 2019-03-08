const Cadastro = require('../classes/cadastro')

module.exports = class TipoDocumento extends Cadastro {

  constructor() {
    super('vs_api_tipos_documentos')
  }

}
