const Cadastro = require('../classes/cadastro')

module.exports = class Loja extends Cadastro {

  constructor() {
    super('vs_api_lojas')
  }


  static getInstance(value, field = 'id') {
    return new Promise((resolve, reject) => {
      let loja = new Loja()
      loja.findByField(field, '=', value)
        .then(found => resolve(found ? loja : {}))
        .catch(error => reject(error))
    })
  }

  
}
