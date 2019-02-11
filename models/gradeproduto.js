const Cadastro = require('../classes/cadastro')
const db = require('../utils/db')

module.exports = class GradeProduto extends Cadastro {

  constructor() {
    super('vs_api_grades_produtos')
  }


  setData(grade) {
    return new Promise((resolve, reject) => {
      grade.linhas = []
      grade.colunas = []
      db.query('SELECT * FROM vs_api_grades_produtos_itens WHERE id_grade = $1 ORDER BY dim, seq', [grade.id])
        .then(resp => {
          resp.rows.forEach(r => grade[ r.dim === 'C' ? 'colunas' : 'linhas' ]
            .push({ seq: r.seq, descricao: r.descricao}))
          resolve(grade)
        })
        .catch(error => reject(error))
    })
  }

}
