const db = require('../utils/db')

module.exports = class Venda {


  static async delete(data) {

    let msg = []
    data.id_venda = parseInt(data.id_venda || 0)    

    Venda.validar(data, msg)

    if (msg.length > 0) 
      return {sucesso: false, erros: msg}

    let sql = 'SELECT api_venda_excluir( $1 ) as sucesso'
  
    let {rows} = await db.query(sql, [JSON.stringify(data)])
  
    return {sucesso: rows[0].sucesso}
  
  }

  
  static async deleteItem(item) {

    let msg = []
    item.id_item  = parseInt(item.id_item  || 0)
    item.id_venda = parseInt(item.id_venda || 0)    

    Venda.validar(item, msg)

    if (! item.id_item)
      msg.push('ID do item não informado.')

    if (msg.length > 0) 
      return {sucesso: false, erros: msg}

    let sql = 'SELECT api_venda_excluir_item( $1 ) as sucesso'
  
    let {rows} = await db.query(sql, [JSON.stringify(item)])
  
    return {sucesso: rows[0].sucesso}
  
  }


  static async getItens(item) {

    let msg = []
    item.id_item  = parseInt(item.id_item  || 0)
    item.id_venda = parseInt(item.id_venda || 0)

    Venda.validar(item, msg)

    if (! msg.length) {

      let sql = 'SELECT * from vs_api_vendas_temp_itens WHERE id_venda = $1'
      let params = [item.id_venda]

      if (item.id_item) {
        sql += ' and id_item = $2 ORDER BY id_item'
        params.push(item.id_item)
      }

      let {rows} = await db.query(sql, params)

      if (item.id_item) {
        
        if (rows.length) 
          return {sucesso: true, item: rows[0]}
        
        msg.push('O item informado não existe na venda!')

      } else {

        if (rows.length) 
          return {sucesso: true, itens: rows}
        
        msg.push('Não há itens na venda informada!')

      }

    }

    return {sucesso: false, erros: msg}

  }


  static async saveItem(item) {

    let msg = []
    item.id_item  = parseInt(item.id_item  || 0)
    item.id_venda = parseInt(item.id_venda || 0)    

    if (! item.id_produto)
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

    let sql = 'SELECT api_venda_salvar_item( $1 ) as result'

    let {rows} = await db.query(sql, [JSON.stringify(item)])

    return {
      sucesso: true, 
      ...JSON.parse(rows[0].result)
    }

  }


  static async gerarPreVenda(venda) {

    let msg = []
    venda.id_venda = parseInt(venda.id_venda || 0)    

    Venda.validar(venda, msg)

    if (! venda.id_cliente)
      msg.push('Cliente não informado.')
    if (! venda.id_vendedor)
      msg.push('Vendedor não informado.')
    if (! venda.id_plano_pag)
      msg.push('Plano de pagamento não informado.')
    if (! venda.id_tab_preco)
      msg.push('Tabela de preço não informada.')
    if (msg.length > 0) 
      return {sucesso: false, erros: msg}

    let sql = 'SELECT api_venda_gerar_prevenda( $1 ) as result'

    let {rows} = await db.query(sql, [JSON.stringify(venda)])

    return {
      sucesso: true,
      ...JSON.parse(rows[0].result)
    }

  }


  static validar(oJson, aMsg) {
    aMsg = Array.isArray(aMsg) ? aMsg : []
    if (! oJson.id_venda)
      aMsg.push('ID da venda não informado.')
    if (! oJson.id_loja)
      aMsg.push('ID da loja não informado.')    
    if (! oJson.id_usuario)
      aMsg.push('ID do usuário não informado.')
  }


  static async mudarTabelaPreco(venda) {
    let msg = []
    venda.id_venda = parseInt(venda.id_venda || 0)

    Venda.validar(venda)

    if (! venda.id_tab_preco)
      msg.push('ID da tabela de preço não informado.')

    if (msg.length > 0)
      return {sucesso: false, erros: msg}

    let sql = 'SELECT api_venda_mudar_tab_preco( $1 ) as result'

    let {rows} = await db.query(sql, [JSON.stringify(venda)])

    return {
      sucesso: true,
      ...JSON.parse(rows[0].result)
    }

  }

}
