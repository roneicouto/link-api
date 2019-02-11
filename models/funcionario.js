const Cadastro = require('../classes/cadastro')

module.exports = class Funcionario extends Cadastro {

  constructor() {
    super('vs_api_funcionarios')
  }

}