const Cadastro = require('../classes/cadastro')

module.exports = class TipoDocumento extends Cadastro {

  constructor() {
    super('a_docume', 'c_codigo', 'c_doc')
  }

  setData(rows) {
    this.data = rows.map( r => ( {
       id   : r.c_codigo,
       nome : r.c_doc
    } ) )
  }

}
