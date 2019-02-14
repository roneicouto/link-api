const utils = require('../utils/utils')
const Cadastro = require('../classes/cadastro')

module.exports = class Municipio extends Cadastro {

  constructor() {
    super('vs_api_municipios')
  }

  
  static async exists(id) {
    let municipio = await Municipio.getInstance(id)
    return ! utils.isEmptyObject(municipio)
  }


  static getInstance(id) {
    return Cadastro.getInstance(Municipio, id)
  }
  
}
