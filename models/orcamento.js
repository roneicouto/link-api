const createError = require('http-errors')
const db = require('../utils/db')
const SqlPage = require('../classes/sql-page')

module.exports = class Orcamento {

  constructor() {
    this.reset()
  }

  reset() {
    this.sql = {
      where: '',
      orderBy: '',
      params: [],
      page: 0
    }
    this.data = {}
  }


  findByNumero(idLoja, numero) {
    this.reset()
    this.sql.where  = 'id_loja = $1 and numero = $2'
    this.sql.params = [idLoja, numero.padStart(10)]
    return this.executeSql()
  }


  findByIdVenda(idVenda) {
    this.reset()
    this.sql.where   = 'id_venda = $1 and situacao = $2'
    this.sql.params  = [idVenda, 'F']
    this.sql.orderBy = 'id_loja, id_opcom, num_venda'
    return this.executeSql(true)
  }


  findByPeriodo(query) {
    this.reset()

    if (! query.page || query.page <= 0) 
      throw new createError.BadRequest('Página não informada!')
    if (! query.data_ini)
      throw new createError.BadRequest('Data inicial não informada!')
    if (! query.data_fim)
      throw new createError.BadRequest('Data final não informada!')
    this.sql.page  = query.page
    this.sql.where = 'data >= $1 and data <= $2'
    this.sql.params.push(query.data_ini, query.data_fim)
    if (query.id_loja) {
      this.sql.params.push(query.id_loja)
      this.sql.where += ' and id_loja = $' + this.sql.params.length
    }
    if (query.id_cliente) {
      this.sql.params.push(query.id_cliente)
      this.sql.where += ' and id_cliente = $' + this.sql.params.length
    }
    if (query.id_vendedor) {
      this.sql.params.push(query.id_vendedor)
      this.sql.where += ' and id_vendedor = $' + this.sql.params.length
    }
    if (query.id_plano_pag) {
      this.sql.params.push(query.id_plano_pag)
      this.sql.where += ' and id_plano_pag ~ $' + this.sql.params.length
    }
    if (query.situacao) {
      this.sql.params.push(query.situacao)
      this.sql.where += ' and situacao ~ $' +this.sql.params.length
    }
    this.sql.orderBy = 'data, id_loja, numero'
    return this.executeSql(true)
  }


  async executeSql(retArray = false) {
    let cmdSql = 'SELECT * FROM vs_api_orcamentos' +
                  (this.sql.where   ? ' WHERE '    + this.sql.where   : '') +
                  (this.sql.orderBy ? ' ORDER BY ' + this.sql.orderBy : '') +
                  (retArray ? '' : ' LIMIT 1')
    console.log(cmdSql)
    let {rows} = await (this.sql.page > 0 ? new SqlPage(cmdSql, this.sql.params).getPage(this.sql.page)
                                          : db.query(cmdSql, this.sql.params))
    if (retArray) {
      let lista = rows.map( row => {
        let orcamento = new Orcamento()
        orcamento.data = row
        return orcamento
      })
      return lista
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
    let sql = 'SELECT * FROM vs_api_orcamentos_itens '+
              'WHERE id_loja = $1 and numero = $2 '+
              'ORDER BY seq'
    let resp = await db.query(sql, [idLoja, numero.padStart(10)])
    return resp.rows
  }


  static async getInstance(idLoja, numero) {
    let orcamento = new Orcamento()
    let found    = await orcamento.findByNumero(idLoja, numero)
    return found ? orcamento : {}
  }

    
}
