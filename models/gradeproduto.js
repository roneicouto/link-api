const Cadastro = require('../classes/cadastro')

module.exports = class GradeProduto extends Cadastro {

  constructor() {
    super('vs_api_grades_produtos')
  }


  async setData(grade) {

    grade.linhas = []
    grade.colunas = []

    const rows = await this.knex('vs_api_grades_produtos_itens').where('id_grade', grade.id)

    rows.forEach(r => grade[ r.dim === 'C' ? 'colunas' : 'linhas' ].push({ seq: r.seq, descricao: r.descricao}))

    return grade

  }

}
