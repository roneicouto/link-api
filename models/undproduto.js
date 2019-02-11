const Cadastro = require('../classes/cadastro')

module.exports = class UnidadeProduto extends Cadastro {

  constructor() {
    super('a_unidades', 'c_und', 'c_descr')
  }

  setData(rows) {
    this.data = rows.map( r => ( {
       id : r.c_und,
       descricao : r.c_descr,
       undPadrao: r.c_undpad
    } ) )
  }

}
