const Cadastro = require('../classes/cadastro')
const db = require('../utils/db')

module.exports = class ClassProduto extends Cadastro {

  constructor() {
    super('vs_api_grupos_produtos')
  }

}
