const Cadastro = require('../classes/cadastro')
const db = require('../utils/db')

module.exports = class PlanoPagamento extends Cadastro {

  constructor() {
    super('vs_api_planos_pag')
  }

  async setData(plano) {  
    let promises = await Promise.all([
      db.query('SELECT * FROM vs_api_planos_pag_tab_precos WHERE id_plano_pag = $1', [plano.id]),
      db.query('SELECT * FROM vs_api_planos_produtos       WHERE id_plano_pag = $1', [plano.id])
    ])
    plano.tabelas = []
    promises[0].rows.forEach(row => plano.tabelas.push(row.id_tab_preco))
    plano.produtos = []            
    promises[1].rows.forEach(row => plano.produtos.push(row))    
    return plano
  }


  validateProduto(produto) {
    let success = this.data.produtos.every(r => (
      ( !r.ini_id_produto    || produto.id >= r.ini_id_produto ) &&
      ( !r.fim_id_produto    || produto.id <= r.fim_id_produto ) &&
      ( !r.ini_classe        || produto.classe >= r.ini_classe  ) &&
      ( !r.fim_classe        || produto.classe <= r.fim_classe  ) &&
      ( !r.ini_id_familia    || produto.id_familia >= r.ini_id_familia ) &&
      ( !r.fim_id_familia    || produto.id_familia <= r.fim_id_familia ) &&
      ( !r.ini_id_fornecedor || produto.id_fornecedor >= r.ini_id_fornecedor ) &&
      ( !r.fim_id_fornecedor || produto.id_fornecedor <= r.fim_id_fornecedor ) 
    ))
    return success
  }


  static async getPermissoesUsuario(idPlano, idNivel) {
    let resp = await db.query('SELECT * FROM vs_api_planos_pag_restricoes WHERE id_plano = $1 and id_nivel = $2', 
                              [idPlano, idNivel])
    return resp.rows.length ? resp.rows[0] : {}
  }


  static getInstance(idPlano) {
    return Cadastro.getInstance(PlanoPagamento, idPlano)
  }

}

