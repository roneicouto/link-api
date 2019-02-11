const RotaCadastro = require('../../classes/rotacadastro')

const rotas = {
  areasclientes: 'areacliente',  
  atividades: 'atividade',  
  bancos: 'portador',
  centroscustos: 'centrocusto',
  clientes: 'cliente',
  formaspag: 'formaspag',
  fornecedores: 'fornecedor',
  funcionarios: 'funcionario',
  gradesprodutos: 'gradeproduto',
  gruposclientes: 'grupocliente',
  lojas: 'loja',
  ocrcobrancas: 'ocorrenciacobranca',
  ofsituacoes: 'of-situacao',
  opcomerciais: 'opcomercial',
  parceiros: 'parceiro',
  planospag: 'planopag',
  portadores: 'portador',
  posprevendas: 'posprevenda',
  produtos_grupos: 'classproduto',
  produtos_unidades: 'undproduto',
  tiposcobrancas: 'tipocobranca',
  tiposdoctos: 'tipodoc',
  transportadores: 'transportador',
  usuarios: 'usuario'
}

module.exports = (app) => {
  for (const prop in rotas) {
    let ClassCadastro = require('../../models/' +rotas[prop])    
    RotaCadastro.start(app, '/' + prop.replace('_','/'), ClassCadastro)
  }
}