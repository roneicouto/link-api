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
  municipios: 'municipio',
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

/** 
 * @apiDefine ErroRegistroNaoEncontrado
 * 
 * @apiError {Number} status  Código de status HTTP.
 * @apiError {String} message Mensagem de erro.
 *
 * @apiErrorExample Erro:
 *     HTTP/1.1 404 
 *     {
 *       "status": 404,
 *       "message": "Registro não encontrado!"
 *     }
 */


/**
 * @api {get} /areasclientes/:id  Consulta áreas ou regiões de clientes.
 * @apiVersion 1.0.0
 * @apiName getAreasClientes
 * @apiGroup Clientes
 *
 * @apiHeader {String} Authorization token obtido no login do usuário.
 * 
 * @apiParam {String} [id] ID (código) da área de cliente. Quando não informado, a requisição retornará um array de áreas de acordo com o número da página informado.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String} id    ID (código) da área de cliente.
 * @apiSuccess {String} nome  Nome da área de cliente.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "00001",
 *      "nome": "ZONA NORTE DE TERESINA"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */



/**
 * @api {get} /gruposclientes/:id  Consulta grupos de clientes.
 * @apiVersion 1.0.0
 * @apiName getGruposClientes
 * @apiGroup Clientes
 *
 * @apiHeader {String} Authorization token obtido no login do usuário.
 * 
 * @apiParam {String} [id] ID (código) do grupo de cliente. Quando não informado, a requisição retornará um array de grupos de clientes.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String} id    ID (código) do grupo de clientes.
 * @apiSuccess {String} nome  Nome do grupo de clientes.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "001",
 *      "nome": "CLIENTE VIP"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /atividades/:id  Consulta atividades dos clientes.
 * @apiVersion 1.0.0
 * @apiName getAtividades
 * @apiGroup Clientes
 *
 * @apiHeader {String} Authorization token obtido no login do usuário.
 * 
 * @apiParam {String} [id] ID (código) da atividade. Quando não informado, a requisição retornará um array de atividades de acordo com a página informada.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String} id    ID (código) da atividade.
 * @apiSuccess {String} nome  Nome da atividade.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "001",
 *      "nome": "COMERCIO VAREJISTA"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /bancos/:id  Consulta bancos.
 * @apiVersion 1.0.0
 * @apiName getBancos
 * @apiGroup Outros Cadastros
 *
 * @apiHeader {String} Authorization Token obtido no login do usuário.
 * 
 * @apiParam {String} [id] ID (código) do banco. Quando não informado, a requisição retornará um array de bancos de acordo com a página informada.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id    ID (código) do banco.
 * @apiSuccess {String}   nome  Nome do banco.
 * @apiSuccess {String}   sigla Sigla do banco.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "0001",
 *      "nome": "BANCO DO BRASIL",
 *      "sigla": "BB"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /centroscustos/:id  Consulta centros de custos
 * @apiVersion 1.0.0
 * @apiName getCentrosCustos
 * @apiGroup Outros Cadastros
 *
 * @apiHeader {String} Authorization Token obtido no login do usuário.
 * 
 * @apiParam {String} [id] ID (código) do centro de custo. Quando não informado, a requisição retornará um array de centros de custos de acordo com a página informada.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id              ID (código) do centro de custo.
 * @apiSuccess {String}   nome            Nome do centro de custo.
 * @apiSuccess {String}   classificacao   Classificação do centro de custo.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "01",
 *      "nome": "RECURSOS HUMANOS",
 *      "classificacao": "01.001.001"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /formaspag/:id  Consulta Formas (meios) de pagamentos
 * @apiVersion 1.0.0
 * @apiName getFormasPag
 * @apiGroup Outros Cadastros
 *
 * @apiHeader {String} Authorization Token obtido no login do usuário.
 * 
 * @apiParam {String} [id] ID (código) da forma de pagamento. Quando não informado, a requisição retornará um array de formas de pagamentos.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id        ID (código) da forma de pagamento.
 * @apiSuccess {String}   nome      Nome da forma de pagamento.
 * @apiSuccess {Boolean}  parcelas  Indica se a forma de pagamento gera parcelas.
 * @apiSuccess {Boolean}  cheques   Indica se a forma de pagamento requisita lançamento de cheques.
 * @apiSuccess {String}   cartao    Tipo de cartão de crédito usado no pagamento (TEF).   
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "01",
 *      "nome": "CARTAO DE CREDITO",
 *      "parcelas": false,
 *      "cheques": false,
 *      "cartao": "TODOS"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /fornecedores/:id  Consulta Fornecedores
 * @apiVersion 1.0.0
 * @apiName getFornecedores
 * @apiGroup Outros Cadastros
 *
 * @apiHeader {String} Authorization Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]      ID (código) ou CNPJ ou CPF fornecedor, sem formatação. Quando não informado, a requisição retornará um array de fornecedores.
 * @apiParam {String} [order]   Campo a ser utilizado na busca e ordenação dos registros. Somente quando <code>id</code> não for informado.
 * @apiParam {String} [value]   Conteudo do campo de busca informado.
 * @apiParam {Number} [page]    Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id              ID (código) do fornecedor.
 * @apiSuccess {String}   nome            Nome ou razão social do fornecedor.
 * @apiSuccess {String}   nome_fantasia   Nome fantasia do fornecedor.
 * @apiSuccess {String}   pessoa          F - Física ou J - Jurídica.
 * @apiSuccess {Boolean}  ativo           Indica se o fornecedor está ou não ativo.
 * @apiSuccess {String}   endereco        Endereço do fornecedor.
 * @apiSuccess {String}   numero_end      Número do estabelecimento do fornecedor.
 * @apiSuccess {String}   bairro          Bairro do fornecedor.
 * @apiSuccess {String}   cidade          Cidade do fornecedor.
 * @apiSuccess {String}   uf              UF do fornecedor.
 * @apiSuccess {String}   cep             CEP do fornecedor.
 * @apiSuccess {String}   telefone        Número do telefone do fornecedor.
 * @apiSuccess {String}   celular         Número do celular do fornecedor.
 * @apiSuccess {String}   email           E-mail do fornecedor.
 * @apiSuccess {String}   cnpj_cpf        CNPJ ou CPF do fornecedor, sem formatação.
 * @apiSuccess {String}   insc_estadual   Inscrição Estadual do fornecedor.
 * 
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 * 
 *     {
 *         "id": "00000071",
 *         "nome": "ALDO COMPONENTES ELETRONICOS LTDA.",
 *         "nome_fantasia": "ALDO COMPONENTES ELETRONICOS L",
 *         "pessoa": "J",
 *         "ativo": true,
 *         "endereco": "R PORTO ALEGRE",
 *         "numero_end": "307 ",
 *         "bairro": "NOVA ZELANDIA",
 *         "cidade": "SERRA",
 *         "uf": "ES",
 *         "cep": "29175-706",
 *         "telefone": "(44) 3261-2000",
 *         "celular": "",
 *         "email: "contato@aldo.com.br",
 *         "cnpj_cpf": "81106957000208",
 *         "insc_estadual": "082804931"
 *      } 
 *
 * @apiUse ErroRegistroNaoEncontrado
 */



/**
 * @api {get} /funcionarios/:id  Consulta Funcionarios.
 * @apiVersion 1.0.0
 * @apiName getFuncionarios
 * @apiGroup Outros Cadastros
 *
 * @apiHeader {String} Authorization Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]      ID (código) do funcionário. Quando não informado, a requisição retornará um array de funcionários.
 * @apiParam {String} [order]   Campo a ser utilizado na busca e ordenação dos registros. Somente quando <code>id</code> não for informado.
 * @apiParam {String} [value]   Conteudo do campo de busca informado.
 * @apiParam {Number} [page]    Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id              ID (código) do funcionário.
 * @apiSuccess {String}   nome            Nome do funcionário.
 * @apiSuccess {String}   apelido         Apelido do funcionário.
 * @apiSuccess {String}   funcao          V - Vendedor C - Cobrador ou S - Supervisor.
 * @apiSuccess {String}   id_loja         ID da loja onde o funcionário está localizado.
 * @apiSuccess {Boolean}  ativo           Indica se o funcionário está ou não ativo.
 * 
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 * 
 *     {
 *         "id": "023",
 *         "nome": "LUIS HENRIQUE DE SOUSA",
 *         "apelido": "LUIS HENRIQUE",
 *         "funcao": "V",
 *         "id_loja": "01",
 *         "ativo": true
 *      } 
 *
 * @apiUse ErroRegistroNaoEncontrado
 */



 /**
 * @api {get} /gradesprodutos/:id  Consulta grades de produtos.
 * @apiVersion 1.0.0
 * @apiName getGradesProdutos
 * @apiGroup Produtos
 *
 * @apiHeader {String} Authorization token obtido no login do usuário.
 * 
 * @apiParam {String} [id]    ID (código) da grade de produtos. Quando não informado, a requisição retornará um array de grades de produtos.
 * @apiParam {Number} [page]  Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id                 ID (código) da grade.
 * @apiSuccess {String}   descricao          Descrição da grade.
 * @apiSuccess {String}   descr_linha        Descrição da linha da grade.
 * @apiSuccess {String}   descr_coluna       Descrição das colunas da grade.
 * 
 * @apiSuccess {Object[]} linhas             Array contendo os dados das linhas da grade.
 * @apiSuccess {String}   linhas.seq         Posição da linha de grade.
 * @apiSuccess {String}   linhas.descricao   Descrição da posição de linha da grade.
 * 
 * @apiSuccess {Object[]} colunas            Array contendo os dados das colunas da grade.
 * @apiSuccess {String}   colunas.seq        Posição da coluna de grade.
 * @apiSuccess {String}   colunas.descricao  Descrição da posição de coluna da grade.
 * 
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 * 
 *    {
 *       "id": "00001",
 *       "descricao": "CORES E TAMANHOS",
 *       "descr_linha": "CORES",
 *       "descr_coluna": "TAMANHO",
 *       "linhas": [
 *         {
 *           "seq": "01",
 *           "descricao": "BRANCA"
 *         },
 *         {
 *           "seq": "02",
 *           "descricao": "AZUL"
 *         },
 *         {
 *           "seq": "03",
 *           "descricao": "VERDE"
 *         }
 *       ],
 *       "colunas": [
 *         {
 *           "seq": "01",
 *           "descricao": "PEQUENO"
 *         },
 *         {
 *           "seq": "02",
 *           "descricao": "MEDIO"
 *         },
 *         {
 *           "seq": "03",
 *           "descricao": "GRANDE"
 *         }
 *       ]
 *     }
 * 
 * 
 * @apiUse ErroRegistroNaoEncontrado
 */


/**
 * @api {get} /lojas/:id  Consulta lojas.
 * @apiVersion 1.0.0
 * @apiName getLojas
 * @apiGroup Outros Cadastros
 *
 * @apiHeader {String} Authorization Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) da loja. Quando não informado, a requisição retornará um array de centros de lojas.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id              ID (código) da loja.
 * @apiSuccess {String}   nome            Nome da loja.
 * @apiSuccess {String}   razao_social    Razão Social da loja.
 * @apiSuccess {String}   nome_fantasia   Nome fantasia da loja.
 * @apiSuccess {String}   cnpj            CNPJ da loja.
 * @apiSuccess {string}   insc_estadual   Inscrição estadual da loja.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "00",
 *      "nome": "MATRIZ",
 *      "razao_social": "NORTELINK TECNOLOGIA EM SISTEMAS LTDA",
 *      "nome_fantasia": "NORTELINK SISTEMAS",
 *      "cnpj": "12.743.428/0001-03",
 *      "insc_estadual": "12.123.123-1"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */



 /**
 * @api {get} /municipios/:id  Consulta municípios.
 * @apiVersion 1.0.0
 * @apiName getMunicipios
 * @apiGroup Outros Cadastros
 *
 * @apiHeader {String} Authorization Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) do município. Quando não informado, a requisição retornará um array de municípios.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id          ID (código) do município.
 * @apiSuccess {String}   nome        Nome do município.
 * @apiSuccess {String}   uf          UF do município.
 * @apiSuccess {String}   cod_siaf    Código do município no SIAF.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "2211001",
 *      "nome": "TERESINA",
 *      "uf": "PI",
 *      "cod_siaf": "1219",
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */

