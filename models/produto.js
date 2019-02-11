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


  static precoVenda(idProduto, idLoja, idTabela) {
    return new Promise((resolve, reject) =>{
      let params, sql
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
      db.query(sql, params)
        .then(({rows}) => resolve(! idTabela ? rows : rows.length > 0 ? rows[0] : {}))
        .catch(error => reject(error))
    })
  }

  static precoTabela(idProduto, idLoja, idTabela) {
    return new Promise((resolve, reject) => {
      Produto.precoVenda(idProduto, idLoja, idTabela)
        .then(preco => resolve( preco.preco_venda || 0))
        .catch(error => reject(error))
    })
  }


  static precoVendaPlano(idProduto, idLoja, idTabela, idPlano) {
    return new Promise((resolve, reject) => {
      let params, sql
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
      db.query(sql, params)
        .then(({rows}) => resolve(! idPlano ? rows : rows.length > 0 ? rows[0] : {}))
        .catch(error => reject(error))
    })
  }


  static estoqueLoja(idProduto, idLoja) {
    return new Promise((resolve, reject) => {
      let params, sql
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
              id = $1
              ${ idLoja ? 'and id_loja = $2 ' : ''}
            ORDER BY
              id_loja`
      db.query(sql, params)
        .then(({rows}) => resolve(! idLoja ? rows : rows.length > 0 ? rows[0] : {}))
        .catch(error => reject(error))
    })
  }


  static estoqueLojaGrade(idProduto, idLoja, posGrade) {
    return new Promise((resolve, reject) => {
      let params, sql
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
      db.query(sql, params)
        .then(({rows}) => resolve(! posGrade ? rows : rows.length > 0 ? rows[0] : {} ))
        .catch(error => reject(error))
    })
  }

  static load(idProduto, idLoja) {
    return new Promise((resolve, reject) => {
      let produto = new Produto()
      produto.idLoja = idLoja
      produto.findById(idProduto)
        .then(found => resolve(found ? produto : {}))
        .catch(error => reject(error))
    })
  }

}
