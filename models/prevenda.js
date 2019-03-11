const createError = require('http-errors')
const db = require('../utils/db')
const utils = require('../utils/utils')
const SqlPage = require('../classes/sql-page')
const Loja = require('../models/loja')
const OpComercial = require('../models/opcomercial')
const Produto = require('../models/produto')


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
    if (! filter.page || filter.page <= 0) 
      throw new createError.BadRequest('Página não informada!')
    if (! filter.data_ini)
      throw new createError.BadRequest('Data inicial não informada!')
    if (! filter.data_fim)
      throw new createError.BadRequest('Data final não informada!')
    this.sql.page  = filter.page
    this.sql.where = 'data >= $1 and data <= $2'
    this.sql.params.push(filter.data_ini, filter.data_fim)
    if (filter.id_loja) {
      this.sql.params.push(filter.id_loja)
      this.sql.where += ' and id_loja = $' + this.sql.params.length
    }
    if (filter.id_cliente) {
      this.sql.params.push(filter.id_cliente)
      this.sql.where += ' and id_cliente = $' + this.sql.params.length
    }
    if (filter.id_vendedor) {
      this.sql.params.push(filter.id_vendedor)
      this.sql.where += ' and id_vendedor ~ $' + this.sql.params.length
    }
    if (filter.id_plano_pag) {
      this.sql.params.push(filter.id_plano_pag)
      this.sql.where += ' and id_plano_pag ~ $' + this.sql.params.length
    }
    if (filter.situacao) {
      this.sql.params.push(situacao)
      this.sql.where += ' and situacao ~ $' +this.sql.params.length
    }
    if (filter.id_posicao) {
      this.sql.params.push(id_posicao)
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
    console.log(cmdSql)
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
  


  create() {
    return this.save(true);
  }


  update() {
    return this.save(false);
  }


  async save(novo) {
    let data = this.data, msg = [], valorTotal = 0
    if (! data.id_loja || ! await Loja.exists(data.id_loja))
      msg.push('Loja não informada ou não existe.')
    if (! novo && ! /\d/.test(data.numero))
      msg.push('Número da pré-venda não informado.')
    if (! data.id_cliente)
      msg.push('ID do cliente não informado.')
    if (! data.id_plano_pag)
      msg.push('O plano de pagamento não foi informado.')
    if (! data.id_vendedor)
      msg.push('O vendedor não foi informado.')
    if (! data.id_tab_preco)
      msg.push('A tabela de preços não foi informada.')
    if (!data.id_usuario)
      msg.push('O ID do usuário não foi informado.')
    if (!data.id_opcom)
      msg.push('ID da operação comercial não informado.')
    else {
      let opcom = await OpComercial.getInstance(data.id_opcom)
      if (!opcom.data || opcom.data.tipo_mov!=='5')
        msg.push('A operação comercial informada não é do tipo venda.')
    }
    if (! this.data.itens)
      msg.push('Os itens da pré-venda não foram informados.')
    
    data.itens.forEach(item => {
      let prod  = 'Produto '+item.id_produto
      let total = utils.roundVal(item.quantidade * item.preco * (1 - item.pdesc / 100), 2)
      if (! item.preco || item.preco <= 0)
        msg.push(prod + ' com preço inválido.')
      if (! item.quantidade || item.quantidade <= 0)
        msg.push(prod + ' com quantidade inválida.')
      if (item.pdesc < 0)
        msg.push(prod + ' com desconto inválido.')
      if (total !== item.vl_total)
        msg.push(prod + ' com diferença no valor total.')
      valorTotal += total
    })

    valorTotal = utils.roundVal(valorTotal, 2)
    if (valorTotal !== data.vl_itens)
      msg.push('Existe uma diferença na soma do valor total dos itens.')

    valorTotal = utils.roundVal(valorTotal + data.vl_acrescimo - data.vl_desconto, 2)
    if (valorTotal !== data.vl_total)
      msg.push('Existe uma diferença no valor total da pré-venda.')
    
    if (msg.length > 0) 
      return {sucesso: false, erros: msg}

    let params = [
      data.id_loja,
      novo ? '' : numero,
      data.id_cliente,
      data.id_vendedor,
      data.id_tab_preco,
      data.id_plano_pag,
      data.id_pos,
      data.mod_venda,
      data.vl_tabela,
      data.vl_itens,
      data.vl_acrescimo,
      data.vl_desconto,
      data.vl_total,
      data.vl_entrada,
      data.parcelas,
      data.vl_parcela,
      data.data_entrega,
      data.hora_entrega,
      data.tipo_entrega,
      data.id_loja_sep,
      data.id_obra,
      data.id_parceiro,
      data.id_end_entrega,
      data.obs,
      data.id_usuario
    ]

    let cmdSql = 'SELECT api_salvar_pre_venda('
    
    params.forEach((v, i) => cmdSql += (i > 0 ? ',' : '') + '$' + (++i))
    cmdSql += ') as numero'

    let client = await db.client()
    try {

      await client.query('BEGIN')

      let {rows} = await client.query(cmdSql, params)
      data.numero = rows[0].numero
  
      await Promise.all(data.itens.map((item, i) => {
        item.seq = (i + 1).toString().padStart(3, '0')
        data.itens[i].id_loja = data.id_loja
        data.itens[i].numero = data.numero
        data.itens[i].seq = item.seq
        let params = [
          data.id_loja,
          data.numero,
          item.seq,
          item.id_produto,
          item.complemento,
          item.pos_grade,
          item.fracionado,
          item.quantidade,
          item.preco,
          item.pdesc,
          item.vl_total,
          item.preco_tabela,
          item.promocao
        ]

        let cmdSql = 'SELECT api_salvar_item_pre_venda('
        params.forEach((v,i) => cmdSql += (i > 0 ? ',' : '') + '$' + (++i))
        cmdSql += ') as done'
        return client.query(cmdSql, params)
      }))

      await client.query( 'SELECT api_reservar_pre_venda($1, $2)', [data.id_loja, data.numero])
      await client.query('COMMIT')

    } catch (error) {

      await client.query('ROLLBACK')
      throw error

    } finally {

      client.release()

    }

    return {
      sucesso: true, 
      id_loja: data.id_loja, 
      numero: data.numero.trim()
    }

  }


  static async delete(loja, numero) {
    let {rows} = await db.query('SELECT api_excluir_prevenda($1, $2) as sucesso', [loja, numero])
    return {sucesso: rows[0].sucesso}
  }


  static async cancel(loja, numero, motivo) {
    let {rows} = await db.query('SELECT api_cancelar_prevenda($1, $2, $3) as sucesso', [loja, numero, motivo])
    return {sucesso: rows[0].sucesso}
  }


  static async getItens(idLoja, numero) {
    let sql = 'SELECT * FROM vs_api_pre_vendas_itens '+
              'WHERE id_loja = $1 and numero = $2 '+
              'ORDER BY seq'
    let resp = await db.query(sql, [idLoja, numero.padStart(10)])
    return resp.rows
  }


  static async getInstance(idLoja, numero) {
    let prevenda = new PreVenda()
    let found    = await prevenda.findByNumero(idLoja, numero)
    return found ? prevenda : {}
  }

  
  static async deleteTempItem(item) {

    let msg = []
    item.id_prevenda = parseInt(item.id_prevenda || 0)
    item.seq_item    = parseInt(item.seq_item    || 0)
    if (! item.id_loja)
      msg.push('ID da loja não informado.')    
    if (! item.id_prevenda)
      msg.push('ID da pre-venda temporária inválido ou não informado.')
    if (! item.seq_item)
      msg.push('Sequência do item inválida ou não informada.')
    if (! item.id_usuario)
      msg.push('ID do usuário não informado.')

    if (msg.length > 0) 
      return {sucesso: false, erros: msg}

    let params = [
      item.id_loja,
      item.id_prevenda,
      item.seq_item,
      item.id_usuario
    ]

    let sql = 'SELECT api_prevenda_temp_excluir_item('
    params.forEach((v, i) => sql += (i > 0 ? ',' : '') + '$' + (++i))
    sql += ') as sucesso'
  
    let {rows} = await db.query(sql, params)
  
    return {sucesso: rows[0].sucesso}
  
  }


  static async saveTempItem(novo, item) {

    let msg = []
    item.id_prevenda = parseInt(item.id_prevenda || 0)
    item.seq_item    = parseInt(item.seq_item    || 0)
    if (! novo && ! item.id_prevenda)
      msg.push('ID da pre-venda temporária inválido ou não informado.')
    if (! novo && ! item.seq_item)
      msg.push('Sequência do item inválida ou não informada.')
    if (!item.id_produto)
      msg.push('ID do produto ou serviço não informado.')
    if (! item.quantidade || item.quantidade <= 0)
      msg.push('Quantidade do item inválida ou não informada.')
    if (! item.preco || item.preco <= 0)
      msg.push('Preço do item inválido ou não informado.')
    if (! item.id_usuario)
      msg.push('ID do usuário não informado.')
    if (! item.id_loja)
      msg.push('ID da loja não informado.')


    if (msg.length > 0) 
      return {sucesso: false, erros: msg}

    let params = [
      item.id_loja,
      item.id_prevenda,
      item.seq_item,
      item.id_produto,
      item.complemento,
      item.pos_grade,
      item.fracionado,
      item.quantidade,
      item.preco,
      item.preco_tab,
      item.pdesc,
      item.vl_total,
      item.promocao,
      item.id_usuario
    ]

    let sql = 'SELECT api_prevenda_temp_salvar_item('
    params.forEach((v, i) => sql += (i > 0 ? ',' : '') + '$' + (++i))
    sql += ') as id_prevenda'

    let {rows} = await db.query(sql, params)

    return {sucesso: true, id_prevenda: rows[0].id_prevenda}

  }

}
