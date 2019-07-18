const Cadastro = require('../classes/cadastro')

module.exports = class PlanoPagamento extends Cadastro {

  constructor() {
    super('vs_api_planos_pag')
  }

  async setData(plano) {  

    const results = await Promise.all([
      this.knex('vs_api_planos_pag_tab_precos').where('id_plano_pag', plano.id),
      this.knex('vs_api_planos_pag_produtos'  ).where('id_plano_pag', plano.id)
    ])

    plano.tabelas = []    
    plano.produtos = []                

    results[0].forEach(row => plano.tabelas.push(row.id_tab_preco))
    results[1].forEach(row => plano.produtos.push(row))    

    return plano
  }


  validateProduto(produto) {
    const success = this.data.produtos.every(r => (
      ( !r.ini_id_produto    || produto.id >= r.ini_id_produto ) &&
      ( !r.fim_id_produto    || produto.id <= r.fim_id_produto ) &&
      ( !r.ini_classificacao || produto.classificacao >= r.ini_classificacao ) &&
      ( !r.fim_classificacao || produto.classificacao <= r.fim_classificacao ) &&
      ( !r.ini_id_familia    || produto.id_familia >= r.ini_id_familia ) &&
      ( !r.fim_id_familia    || produto.id_familia <= r.fim_id_familia ) &&
      ( !r.ini_id_fornecedor || produto.id_fornecedor >= r.ini_id_fornecedor ) &&
      ( !r.fim_id_fornecedor || produto.id_fornecedor <= r.fim_id_fornecedor ) 
    ))
    return success
  }


  static async getPermissoesUsuario(idPlano, idNivel) {
    const rows = await this.knex('vs_api_planos_pag_restricoes').where({ id_plano_pag: idPlano, id_nivel: idNivel })
    return rows.length ? rows[0] : {}
  }


  static getInstance(idPlano) {
    return Cadastro.getInstance(PlanoPagamento, idPlano)
  }

}
