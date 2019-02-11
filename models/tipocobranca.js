const Cadastro = require('../classes/cadastro')

module.exports = class TipoCobranca extends Cadastro {

  constructor() {
    super('a_tipcob', 'c_codigo', 'c_descr')
  }

  setData(rows) {
    this.data = rows.map( r => ( {
       id : r.c_codigo,
       descricao : r.c_descr
    } ) )
  }

}
