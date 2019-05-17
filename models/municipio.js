const utils = require('../utils/utils')
const Cadastro = require('../classes/cadastro')

module.exports = class Municipio extends Cadastro {

  constructor() {
    super('vs_api_municipios')
  }

  

  getAll(params = {}) {

    params.page = params.page || 1
    params.rows = params.rows || process.env.DB_PAGE_ROWS

    return super.getAll(params)

  }



  static async exists(id) {
    let municipio = await Municipio.getInstance(id)
    return ! utils.isEmptyObject(municipio)
  }


  
  static getInstance(id) {
    return Cadastro.getInstance(Municipio, id)
  }
  
}
