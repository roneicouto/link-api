const createError = require('http-errors')
const db = require('../utils/db')
const SqlPage = require('../classes/sql-page')


module.exports = class PreVenda {

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


  findByPeriodo(filter) {
    this.reset()
    if (! filter.page || filter.page <= 0) {
      throw new createError.BadRequest('Página não informada!')
    }
    this.sql.page = filter.page
    if (filter.data_ini) {
      this.sql.params.push(filter.data_ini)
      this.sql.where = 'data >= $' + this.sql.params.length
    }
    if (filter.data_fim) {
      this.sql.params.push(filter.data_fim)
      this.sql.where = 'data <= $' + this.sql.params.length
    }
    if (filter.loja) {
      this.sql.params.push(filter.loja)
      this.sql.where = 'id_loja = $' + this.sql.params.length
    }
    if (filter.cliente) {
      this.sql.params.push(filter.cliente)
      this.sql.where = 'id_cliente = $' + this.sql.params.length
    }
    if (filter.vendedor) {
      this.sql.params.push(filter.vend)
      this.sql.where = 'id_vendedor ~ $' + this.sql.params.length
    }
    if (filter.plano) {
      this.sql.params.push(filter.plano)
      this.sql.where = 'id_plano_pag ~ $' + this.sql.params.length
    }
    if (filter.situacao) {
      this.sql.params.push(situacao)
      this.sql.where += ' and situacao ~ $' +this.sql.params.length
    }
    if (filter.posicao) {
      this.sql.params.push(posicao)
      this.sql.where += ' and id_pos ~ $' +this.sql.params.length
    }
    this.sql.orderBy = 'data, id_loja, numero'
    return this.executeSql(true)
  }


  async executeSql(retArray = false) {
    let cmdSql = 'SELECT * FROM vs_api_pre_vendas' +
                  (this.sql.where   ? ' WHERE '    + this.sql.where   : '') +
                  (this.sql.orderBy ? ' ORDER BY ' + this.sql.orderBy : '') +
                  (retArray ? '' : ' LIMIT 1')
    let {rows} = await (this.sql.page > 0 ? new SqlPage(cmdSql, this.sql.params).getPage(this.sql.page)
                                          : db.query(cmdSql, this.sql.params))
    if (retArray) {
      let lista = rows.map( row => {
        let prevenda = new PreVenda()
        prevenda.data = row
        return prevenda
      })
      return lista
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
  

  static async getItens(idLoja, numero) {
    let sql = 'SELECT * FROM vs_api_pre_vendas_itens '+
              'WHERE id_loja = $1 and numero = $2 '+
              'ORDER BY seq'
    let resp = await db.query(sql, [idLoja, numero])
    return resp.rows
  }


  static async getInstance(idLoja, numero) {
    let prevenda = new PreVenda()
    let found    = await prevenda.findByNumero(idLoja, numero)
    return found ? prevenda : {}
  }
  

}
