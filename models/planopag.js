const Cadastro = require('../classes/cadastro')
const db = require('../utils/db')

module.exports = class PlanoPagamento extends Cadastro {

  constructor() {
    super('vs_api_planos_pag')
  }

  setData(plano) {  
    return new Promise((resolve, reject) => {
      plano.tabelas = []
      db.query('SELECT * FROM vs_api_planos_pag_tab_precos WHERE id_plano_pag = $1', [plano.id])
        .then(resp => {
          resp.rows.forEach(r => plano.tabelas.push(r.id_tab_preco))
          resolve(plano)
        })
        .catch(error => reject(error))
    })    
  }


  validateProduto(produto) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM vs_api_planos_pag_produtos WHERE id_plano = $1 ORDER BY seq', [this.data.id]) 
        .then(resp => {
          let success = resp.rows.every(r => (
            ( !r.ini_id_produto    || produto.id >= r.ini_id_produto ) &&
            ( !r.fim_id_produto    || produto.id <= r.fim_id_produto ) &&
            ( !r.ini_classe        || produto.classe >= r.ini_classe  ) &&
            ( !r.fim_classe        || produto.classe <= r.fim_classe  ) &&
            ( !r.ini_id_familia    || produto.id_familia >= r.ini_id_familia ) &&
            ( !r.fim_id_familia    || produto.id_familia <= r.fim_id_familia ) &&
            ( !r.ini_id_fornecedor || produto.id_fornecedor >= r.ini_id_fornecedor ) &&
            ( !r.fim_id_fornecedor || produto.id_fornecedor <= r.fim_id_fornecedor ) 
          ))
          resolve(success)
        })
        .catch(error => reject(error))
    })
  }


  getPermissoesUsuario(idNivel) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM vs_api_planos_pag_restricoes WHERE id_plano = $1 and id_nivel = $2', [this.data.id, idNivel])
        .then(resp => resolve(resp.rows.length ? resp.rows[0] : {}))
        .catch(error => reject(error))
    })
  }


}

