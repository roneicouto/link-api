const db = require('../utils/db')
const SqlPage = require('../classes/sql-page')

class ItensPreVenda {

  constructor(loja, numero) {
    this.loja = loja
    this.numero = numero
    this.data = []
  }

  async getItens() {
    let sql, params, result
    sql = `SELECT 
              *
          FROM 
              vs_api_pre_vendas_itens
          WHERE 
              id_loja = $1 and numero = $2
          ORDER 
              BY seq`
    params = [this.loja, this.numero]
    result = await db.query(sql, params)
    this.data = result.rows
    return this.data.length > 0
  }

}



module.exports = class PreVenda {

  constructor() {
    this.where = ''
    this.orderBy = []
    this.params = []
    this.data = []    
    this.retArray = true
  }

  getByNumero(loja, numero) {
    this.where  = 'id_loja = $1 and numero = $2'
    this.params = [loja, numero.padStart(10)]
    this.retArray = false
    return this.executeSql()
  }

  getByPeriodo(inicio, fim, situacao, loja, vendedor, cliente, page) {
    this.where   = 'data >= $1 and data <= $2'
    this.params  = [inicio, fim]
    this.orderBy = ['data', 'id_loja', 'numero']
    if (situacao) {
      this.params.push(situacao)
      this.where += ' and situacao ~ $' + this.params.length
    }
    if (loja) {
      this.params.push(loja)
      this.where += ' and id_loja = $' + this.params.length
    }
    if (vendedor) {
      this.params.push(vendedor)
      this.where += ' and id_vendedor = $' + this.params.length
    }
    if (cliente) {
      this.params.push(cliente)
      this.where += ' and id_cliente = $' + this.params.length
    }
    return this.executeSql(page)
  }


  async executeSql(page = 0) {
    let cmdSql, promise, result, itens
    cmdSql = `SELECT 
                  *
              FROM 
                  vs_api_pre_vendas
              WHERE 
                  ${ this.where }
              ${ this.retArray && this.orderBy.length ? 'ORDER BY '+this.orderBy.toString() : '' }
              `
    promise = (page === 0) ? db.query(cmdSql, this.params)
                            : new SqlPage(cmdSql, this.params).getPage(page)
    result = await promise
    if (this.retArray) {
      this.data = result.rows
      return result.rows.length > 0
    }
    this.retArray = true
    if (! result.rows.length) {
      this.data = []
      return false
    }
    this.data = result.rows[0]
    itens  = new ItensPreVenda(this.data.id_loja, this.data.numero)
    result = await itens.getItens()
    this.data.itens = itens.data 
    return true
  }

  static async getPreVenda(loja, numero) {
    let prevenda = new PreVenda()
    await prevenda.getByNumero(loja, numero)
    return prevenda
  }

}
