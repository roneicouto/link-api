const createError = require('http-errors')
const knex = require('../knex/knexload')
const table = 'vs_api_orcamentos'

module.exports = class Orcamento {

  constructor() {
    this.data = {}
  }


  findByNumero(idLoja, numero) {
    return this.executeSql(
      knex(table).where({ id_loja: idLoja, numero })
    )
  }


  findByIdVenda(idVenda) {
    return this.executeSql(
      knex(table)
        .where({ id_venda: idVenda, situacao: 'F' })
        .orderBy(['id_loja', 'id_opcom', 'num_venda'])
    )
  }


  findByPeriodo(query) {

    if (! query.data_ini)
      throw new createError.BadRequest('Data inicial não informada!')
    if (! query.data_fim)
      throw new createError.BadRequest('Data final não informada!')

    query.page = query.page || 1
    query.rows = query.rows || process.env.DB_PAGE_ROWS

    let sqlBuilder = knex(table).whereBetween('data', [query.data_ini, query.data_fim])

    if (query.id_loja) 
      sqlBuilder.where('id_loja', query.id_loja)

    if (query.id_cliente) 
      sqlBuilder.where('id_cliente', query.id_cliente)

    if (query.id_vendedor) 
      sqlBuilder.where('id_vendedor', '~', query.id_vendedor)

    if (query.id_plano_pag) 
      sqlBuilder.where('id_plano_pag', '~', query.id_plano_pag)

    if (query.situacao) 
      sqlBuilder.where('situacao', '~', query.situacao)

    sqlBuilder
      .orderBy(['data', 'id_loja', 'numero'])
      .limit(query.rows)
      .offset(query.rows * (query.page-1))

    return this.executeSql(sqlBuilder, true)

  }


  async executeSql(sqlBuilder, retArray = false) {

    const rows = await sqlBuilder

    if (retArray) {
      return rows.map( row => {
        const ocm = new Orcamento()
        ocm.data = row
        return ocm
      })
    } 
    
    if (! rows.length) {
      this.data = {}
      return false
    }

    this.data = rows[0]
    this.data.itens = await Orcamento.getItens(this.data.id_loja, this.data.numero)

    this.data.itens.forEach(item => {
      delete item.id_loja
      delete item.numero
    })

    return true

  }
  

  static async getItens(idLoja, numero) {

    const rows = await knex('vs_api_orcamentos_itens')
      .where({ id_loja: idLoja, numero: numero.padStart(10) })
      .orderBy('seq')

    return rows

  }


  static async getInstance(idLoja, numero) {
    let orcamento = new Orcamento()
    let found    = await orcamento.findByNumero(idLoja, numero)
    return found ? orcamento : {}
  }

}
