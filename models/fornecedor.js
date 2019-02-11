const Cadastro = require('../classes/cadastro')

module.exports = class Fornecedor extends Cadastro {

  constructor() {
    super('vs_api_fornecedores')
  }

  
  find(id) {
    return this.findByField(id.length > 10 ? 'cnpj_cpf' : 'id', '=', id)
  }


}