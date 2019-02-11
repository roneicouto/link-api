const Cadastro = require('../classes/cadastro')

module.exports = class Transportador extends Cadastro {

  constructor() {
    super('a_transp', 'c_codigo', 'c_transp')
  }

  setData(rows) {
    this.data = rows.map( r => ( {
       id        : r.c_codigo,
       nome      : r.c_transp,
       viaTransp : r.c_via,       
       cnpj      : r.c_cgc.replace(/\D/g, ''),
       insEst    : r.c_insc
    } ) )
  }

}