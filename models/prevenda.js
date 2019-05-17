const createError = require('http-errors')
const knex = require('../knex/knexload')

module.exports = class PreVenda {

  constructor() {
    this.data = {}
    this.knex = knex
    this.table = 'vs_api_pre_vendas'
  }


  findByNumero(idLoja, numero) {
    return this.executeSql(
      this.knex(this.table).where({ id_loja: idLoja, numero })
    )
  }


  findByIdVenda(idVenda) {
    return this.executeSql(
      this.knex(this.table)
        .where({ id_venda: idVenda, situacao: 'F' })
        .orderBy(['id_loja', 'id_opcom', 'num_venda'])
    )
  }


  findByPeriodo(query) {
    
    if (! query.page || query.page <= 0) 
      throw new createError.BadRequest('Página não informada!')
    if (! query.rows || query.rows <= 0)
      throw new createError.BadGateway('Numero de registros por página não informado!')
    if (! query.data_ini)
      throw new createError.BadRequest('Data inicial não informada!')
    if (! query.data_fim)
      throw new createError.BadRequest('Data final não informada!')

    let sqlBuilder = this.knex(this.table).whereBetween('data', [query.data_ini, query.data_fim])

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

    if (query.id_posicao) 
      sqlBuilder.where('id_pos', '~', query.id_posicao)

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
        let prevenda = new PreVenda()
        prevenda.data = row
        return prevenda
      })
    } 
    
    if (! rows.length) {
      this.data = {}
      return false
    }

    this.data = rows[0]
    this.data.itens = await PreVenda.getItens(this.data.id_loja, this.data.numero)

    this.data.itens.forEach(item => {
      delete item.id_loja
      delete item.numero
    })

    return true
  }


  static async getPendencias(idPrevenda) {

    const rows = await this.knex('vs_prevendas_validacoes')
      .select('id_item', 'tipo_vld', 'descricao')
      .where({ id_pvenda: idPrevenda, pendente: true })
      .orderBy('coalesce(id_item, 0)')

    return {total: rows.length, pendencias: rows}

  }

  
  static async getItens(idLoja, numero) {

    const rows = await this.knex('vs_api_pre_vendas_itens')
      .where({ id_loja: idLoja, numero: numero.padStart(10) })
      .orderBy('seq')

    return rows

  }


  static async getInstance(idLoja, numero) {
    let prevenda = new PreVenda()
    let found    = await prevenda.findByNumero(idLoja, numero)
    return found ? prevenda : {}
  }
 
}
