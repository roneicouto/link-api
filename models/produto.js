const createError = require('http-errors')
const db = require('../utils/db')
const Cadastro = require('../classes/cadastro')

module.exports = class Produto extends Cadastro {

  constructor() {
    super('vs_api_produtos')
    this.idLoja = ''
  }

  getAll(params, page) {
    params = Array.isArray(params) ? params : [params]
    params.push({field: 'id_loja', value: this.idLoja})
    return super.getAll(params, page)
  }

  findByDescricao(descricao, page) {
    return this.getAll({
      field: 'descricao', 
      value: '^' + descricao,
      order: 1
    }, page)
  }


  findByDescricaoParcial(descricao, page) {
    return this.getAll({
        field: 'descricao', 
        value: descricao,
        order: 1
    }, page)
  }


  findByCodigoBarras(codBarras) {
    return this.findByField('codbarras', '=', codBarras)
  }


  findByReferencia(referencia) {
    return this.findByField('referencia', '=', referencia)
  }


  executeSql(page = 0) {
    return new Promise((resolve, reject) => {
      if (! this.idLoja) {
        throw new createError.BadRequest('Loja não informada na busca de produto!')
      }
      let oldSql = {...this.sql}
      this.sql.params.push(this.idLoja)
      this.sql.where += ( this.sql.params.length > 1 ? ' AND' : '' ) +' id_loja = $' + this.sql.params.length
      super.executeSql(page)
        .then(found => resolve(found))
        .catch(error=> reject(error))
        .finally(() => {this.sql = oldSql})
    })
  }


  static async precoVenda(idProduto, idLoja, idTabela) {
    let params, sql, result
    params = [idProduto, idLoja]
    if (idTabela) params.push(idTabela)
    sql = `SELECT 
            id_tab_preco, 
            nome_tab_preco,
            preco_venda,
            preco_promocao
          FROM 
            vs_api_produtos_precos 
          WHERE 
            id_produto = $1 and id_loja = $2
            ${ idTabela ? 'and id_tab_preco = $3' : '' }
          ORDER BY
            id_tab_preco`
    result = await db.query(sql, params)
    return ! idTabela ? result.rows : result.rows.length > 0 ? result.rows[0] : {}
  }

  static async precoTabela(idProduto, idLoja, idTabela) {
    let resp = await Produto.precoVenda(idProduto, idLoja, idTabela)
    return resp.preco_venda
  }


  static async precoVendaPlano(idProduto, idLoja, idTabela, idPlano) {
    let params, sql, result
    params = [idProduto, idLoja, idTabela]
    if (idPlano) params.push(idPlano)
    sql = `SELECT 
            id_plano_pag, 
            nome_plano_pag,
            forma_pag,
            preco_venda
          FROM 
            vs_api_produtos_precos_planos 
          WHERE 
            id_produto = $1 and id_loja = $2 and id_tab_preco = $3
            ${ idPlano ? 'and id_plano_pag = $4' : '' }
          ORDER BY
            id_plano_pag`
    result = await db.query(sql, params)
    return ! idPlano ? result.rows : result.rows.length > 0 ? result.rows[0] : {} 
  }


  static async estoqueLoja(idProduto, idLoja) {
    let params, sql, result
    params = [idProduto]
    if (idLoja) params.push(idLoja)
    sql = `SELECT 
            id_loja, 
            nome_loja,
            saldo_loja,
            saldo_dep,
            saldo_loja_frc,
            saldo_dep_frc
          FROM 
            vs_api_produtos 
          WHERE 
            id_produto = $1
            ${ idLoja ? 'and id_loja = $2 ' : ''}
          ORDER BY
            id_loja`
    result = await db.query(sql, params)
    return ! idLoja ? result.rows : result.rows.length > 0 ? result.rows[0] : {} 
  }


  static async estoqueLojaGrade(idProduto, idLoja, posGrade) {
    let params, sql, result
    params = [idProduto, idLoja]
    if (posGrade) params.push(posGrade)
    sql = `SELECT 
            pos_grade, 
            descr_linha,
            descr_coluna,
            saldo_loja,
            saldo_dep,
            saldo_loja_frc,
            saldo_dep_frc
          FROM 
            vs_api_produtos_grades
          WHERE 
            id_produto = $1 and id_loja = $2
            ${ posGrade ? 'and pos_grade = $3 ' : ''}                  
          ORDER BY
            pos_grade`
    result = await db.query(sql, params)
    return ! posGrade ? result.rows : result.rows.length > 0 ? result.rows[0] : {} 
  }

  static async load(idProduto) {
    let produto = new Produto()
    await produto.getById(idProduto)
    return produto
  }

}
