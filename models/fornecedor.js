const Cadastro = require('../classes/cadastro')

module.exports = class Fornecedor extends Cadastro {

  constructor() {
    super('vs_api_fornecedores')
  }

  
  find(id) {
    return this.findByField(id.length > 10 ? 'cnpj_cpf' : 'id', '=', id)
  }


  
  getAll(params = {}) {

    params.page = params.page || 1
    params.rows = params.rows || process.env.DB_PAGE_ROWS

    return super.getAll(params)

  }


}