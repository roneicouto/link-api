const createError = require('http-errors')
const Cadastro = require('../classes/cadastro')
const knex = require('../knex/knexload')

module.exports = class Produto extends Cadastro {

  constructor() {
    super('vs_api_produtos')
    this.idLoja = ''
  }



  getAll(params = {}) {

    params.where = params.where || []

    if (! Array.isArray(params.where)) 
      params.where = [params.where]  
    
    params.where.push({
      field: 'id_loja',
      operator: '=',
      value: this.idLoja
    })

    params.page = params.page || 1
    params.rows = params.rows || process.env.DB_PAGE_ROWS

    return super.getAll(params)

  }



  findByDescricao(descricao, page, rows) {

    return this.getAll({
      page,
      rows,
      where: [{
        field: 'descricao',
        operator: '~',
        value: '^' + descricao        
      }],
      order: ['descricao']
    })

  }



  findByDescricaoParcial(descricao, page, rows) {

    return this.getAll({
      page,
      rows,
      where: [{
        field: 'descricao',
        operator: '~',
        value: descricao        
      }],
      order: ['descricao']
    })

  }



  findByCodigoBarras(codBarras) {
    return this.findByField('codbarras', '=', codBarras)
  }



  findByReferencia(referencia) {
    return this.findByField('referencia', '=', referencia)
  }



  executeSql(sqlBuilder) {

    if (! this.idLoja)
      throw new createError.BadRequest('Loja não informada na busca do produto!')

    sqlBuilder.where('id_loja', this.idLoja)

    return super.executeSql(sqlBuilder)

  }



  static async precoVenda(idProduto, idLoja, idTabela) {

    const sqlBuilder = knex('vs_api_produtos_precos')
      .select('id_tab_preco', 'nome_tab_preco', 'preco_venda', 'preco_promocao')
      .orderBy('id_tab_preco')
      .where({ id_produto: idProduto, id_loja: idLoja })

    if (idTabela)
      sqlBuilder.where('id_tab_preco', idTabela)

    const rows = await sqlBuilder

    return !idTabela ? rows : rows.length > 0 ? rows[0] : {}

  }



  static async precoTabela(idProduto, idLoja, idTabela) {

    const preco = await Produto.precoVenda(idProduto, idLoja, idTabela)

    return preco.preco_venda || 0

  }



  static async precoVendaPlano(idProduto, idLoja, idTabela, idPlano) {

    const sqlBuilder = knex('vs_api_produtos_precos_planos')
      .select('id_plano_pag', 'nome_plano_pag', 'forma_pag', 'preco_venda')
      .orderBy('id_plano_pag')
      .where({ id_produto: idProduto, id_loja: idLoja, id_tab_preco: idTabela})

    if (idPlano)
      sqlBuilder.where('id_plano_pag', idPlano)

    const rows = await sqlBuilder

    return !idPlano ? rows : rows.length > 0 ? rows[0] : {}

  }



  static async estoqueLoja(idProduto, idLoja) {

    const sqlBuilder = knex('vs_api_produtos')
      .select('id_loja', 'nome_loja', 'saldo_loja', 'saldo_dep', 'saldo_loja_frc', 'saldo_dep_frc')
      .orderBy('id_loja')
      .where('id', idProduto)

    if (idLoja)
      sqlBuilder.where('id_loja', idLoja)

    const rows = await sqlBuilder

    return !idLoja ? rows : rows.length > 0 ? rows[0] : {}

  }



  static async estoqueLojaGrade(idProduto, idLoja, posGrade) {

    const sqlBuilder = knex('vs_api_produtos_grades')
      .select('pos_grade', 'descr_linha', 'descr_coluna', 'saldo_loja', 'saldo_dep', 'saldo_loja_frc', 'saldo_dep_frc')
      .orderBy('pos_grade')
      .where({ id_produto: idProduto, id_loja: idLoja })

    if (posGrade)
      sqlBuilder.where('pos_grade', posGrade)

    const rows = await sqlBuilder

    return !posGrade ? rows : rows.length > 0 ? rows[0] : {}    
    
  }



  static async getInstance(idProduto, idLoja) {

    if (! idLoja) 
      throw new createError.BadRequest('Loja não informada na busca do produto!')

    const prod = new Produto()
    prod.idLoja = idLoja

    const found = await prod.findById(idProduto)

    return found ? prod : {}

  }

}
