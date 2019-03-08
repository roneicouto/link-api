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
  tiposdocumentos: 'tipodoc',
  transportadoras: 'transportador',
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
 * @api {get} /areasclientes/:id  Consultar áreas ou regiões
 * @apiVersion 1.0.0
 * @apiName getAreasClientes
 * @apiGroup Clientes
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
 * @api {get} /gruposclientes/:id  Consultar grupos
 * @apiVersion 1.0.0
 * @apiName getGruposClientes
 * @apiGroup Clientes
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
 * @api {get} /atividades/:id  Consultar atividades
 * @apiVersion 1.0.0
 * @apiName getAtividades
 * @apiGroup Clientes
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
 * @api {get} /bancos/:id  Consultar bancos
 * @apiVersion 1.0.0
 * @apiName getBancos
 * @apiGroup Outros 
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
 * @api {get} /centroscustos/:id  Consultar centros de custos
 * @apiVersion 1.0.0
 * @apiName getCentrosCustos
 * @apiGroup Outros
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
 * @api {get} /formaspag/:id  Consultar Formas (meios) de pagamentos
 * @apiVersion 1.0.0
 * @apiName getFormasPag
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
 * @api {get} /fornecedores/:id  Consultar fornecedores
 * @apiVersion 1.0.0
 * @apiName getFornecedores
 * @apiGroup Outros 
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
 * @api {get} /funcionarios/:id  Consultar funcionários
 * @apiVersion 1.0.0
 * @apiName getFuncionarios
 * @apiGroup Outros
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
 * @api {get} /gradesprodutos/:id  Consultar grades
 * @apiVersion 1.0.0
 * @apiName getGradesProdutos
 * @apiGroup Produtos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
 * @api {get} /lojas/:id  Consultar lojas
 * @apiVersion 1.0.0
 * @apiName getLojas
 * @apiGroup Outros
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
 * @api {get} /municipios/:id  Consultar municípios
 * @apiVersion 1.0.0
 * @apiName getMunicipios
 * @apiGroup Outros
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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


 /**
 * @api {get} /ocrcobrancas/:id  Consultar ocorrencias de cobranças
 * @apiVersion 1.0.0
 * @apiName getOcrCobrancas
 * @apiGroup Cobranca
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) da ocorrência. Quando não informado, a requisição retornará um array de ocorrências.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id              ID (código) da ocorrência.
 * @apiSuccess {String}   descricao       Descrição da ocorrência.
 * @apiSuccess {Boolean}  pagar_comissao  Indica se a ocorrência vair gerar comissão para o cobrador.
 * @apiSuccess {Boolean}  pedir_prazo     Indica se a ocorrência irá solicitar um prazo para pagamento.
 * @apiSuccess {Boolean}  fim_cobranca    Indica se a ocorrência vai encerrar o ciclo de cobrança.
 * @apiSuccess {Number}   carencia        Número de dias de carência para uso da ocorrência.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "01",
 *      "descricao": "MUDANCA DE COBRADOR",
 *      "pagar_comissao": false,
 *      "pedir_prazo": false,
 *      "fim_cobranca": false,
 *      "carencia": 0
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */



 /**
 * @api {get} /ofsituacoes/:id  Consultar situações de serviços
 * @apiVersion 1.0.0
 * @apiName getOfSituacoes
 * @apiGroup Oficina
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) da situação. Quando não informado, a requisição retornará um array de situações.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id              ID (código) da situação.
 * @apiSuccess {String}   descricao       Descrição da situação.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "CA",
 *      "descricao": "CANCELADO",
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /opcomerciais/:id  Consultar operações comerciais
 * @apiVersion 1.0.0
 * @apiName getOpComerciais
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) da operação. Quando não informado, a requisição retornará um array de operações comerciais.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id                ID (código) da operação.
 * @apiSuccess {String}   descricao         Descrição da operação.
 * @apiSuccess {String}   descr_red         Descrição reduzida (sigla).
 * @apiSuccess {String}   tipo_mov          Tipo de movimento comercial (5-Venda).
 * @apiSuccess {String}   mov_estoque       Estoque a ser movimentado (L-Loja D-Depósito N-nenhum).
 * @apiSuccess {Number}   perc_desc_total   Percentual de desconto máximo na venda.
 * @apiSuccess {Number}   perc_desc_item    Percentual de desconto máximo no item.
 * @apiSuccess {Number}   perc_acres_item   Percentual de acréscimo máximo no item.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "10",
 *      "descricao": "VENDA DIRETA",
 *      "descr_red": "VENDA",
 *      "tipo_mov": "5",
 *      "mov_estoque": "L",
 *      "perc_desc_total": 0,
 *      "perc_desc_item": 10,
 *      "perc_acres_item": 0
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /parceiros/:id  Consultar parceiros
 * @apiVersion 1.0.0
 * @apiName getParceiros
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) do parceiro. Quando não informado, a requisição retornará um array de parceiros.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id          ID (código) do parceiro.
 * @apiSuccess {String}   nome        Nome do parceiro.
 * @apiSuccess {String}   telefone    Telefone do parceiro.
 * @apiSuccess {String}   celular     Celular do parceiro.
 * @apiSuccess {Number}   repasse     Percentual de repasse do parceiro.
 * @apiSuccess {String}   cnpj_cpf    CNPJ ou CPF do parceiro.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "00012",
 *      "nome": "PAULO FRANCISCO FARIAS",
 *      "telefone": "(88)9999-9999",
 *      "celular": "(99)9999-9999",
 *      "repasse": 3.5,
 *      "cnpj_cpf": "12345678901"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /planospag/:id  Consultar planos de pagamento
 * @apiVersion 1.0.0
 * @apiName getPlanosPag
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) do plano. Quando não informado, a requisição retornará um array de planos de pagamentos.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id              ID (código) do plano.
 * @apiSuccess {String}   nome            Nome do plano.
 * @apiSuccess {String}   nome_red        Nome reduzido ou sigla do plano.
 * @apiSuccess {String}   forma_pag       Forma de pagamento do plano. 00 a 09.
 * @apiSuccess {Number}   parcelas        Número de parcelas de pagamento a serem geradas.
 * @apiSuccess {String}   periodo         Periodo entre parcelas. D-Dia ou M-Mês.
 * @apiSuccess {String}   id_nivel        Nivel do usuário que pode usar o plano de pagamento numa venda.
 * @apiSuccess {Number}   perc_desc_total Percentual máximo de desconto na venda.
 * @apiSuccess {Number}   perc_desc_item  Percentual máximo de desconto no item.
 * @apiSuccess {Number}   perc_entrada    Percentual mínimo para o valor de entrada na venda a prazo.
 * @apiSuccess {Number}   perc_acrescimo  Percentual mínimo de acréscimo na venda.
 * @apiSuccess {Number}   valor_minimo    Valor mínimo da venda para o plano.
 * @apiSuccess {Boolean}  desconto_auto   Determina se o percentual de desconto será automático.
 * @apiSuccess {Boolean}  acrescimo_auto  Determina do o percentual de acréscimo será automático.
 * @apiSuccess {Number}   dias_atraso     Número máximo de dias de atraso tolerado pelo plano.
 * @apiSuccess {Boolean}  cheque_devol    Determina se o plano de pagamento aceita cliente com cheque devolvido.
 * @apiSuccess {Boolean}  promocao        Determina se o plano aceita produtos em promoção.
 * @apiSuccess {String[]} tabelas         Array contendo a lista de tabelas de preço permitidas no plano.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *       "id": "001",
 *       "nome": "A VISTA",
 *       "nome_red": "A VISTA",
 *       "forma_pag": "01",
 *       "parcelas": 0,
 *       "periodo": "D",
 *       "id_nivel": "99",
 *       "perc_desc_total": 0,
 *       "perc_desc_item": 10,
 *       "perc_entrada": 0,
 *       "perc_acrescimo": 0,
 *       "valor_minimo": 0,
 *       "desconto_auto": false,
 *       "acrescimo_auto": false,
 *       "dias_atraso": 0,
 *       "cheque_devol": true,
 *       "promocao": true,
 *       "tabelas": ["02", "03"]
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /portadores/:id  Consultar portadores
 * @apiVersion 1.0.0
 * @apiName getPortadores
 * @apiGroup Outros
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id] ID (código) do portador. Quando não informado, a requisição retornará um array de portadores.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id      ID (código) do portador.
 * @apiSuccess {String}   nome    Nome do portador.
 * @apiSuccess {String}   sigla   Sigla do portador.
 * @apiSuccess {Boolean}  spc     Indica se o portador é o SPC.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "0013",
 *      "nome": "ESCRITORIO DE ADVOCACIA",
 *      "sigla": "ADVOGADO",
 *      "spc": false
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /posprevendas/:id  Consultar posições de pré-vendas
 * @apiVersion 1.0.0
 * @apiName getPosPreVendas
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id] ID (código) da posição. Quando não informado, a requisição retornará um array de posições de pré-vendas.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id           ID (código) da posição.
 * @apiSuccess {String}   descricao    Descrição da posição.
 * @apiSuccess {Boolean}  faturar      Indica se a posição de pré-venda permite faturamento.
 * @apiSuccess {Boolean}  alterar      Indica se a posição de pré-venda permite alteração.
 * @apiSuccess {Boolean}  cancelar     Indica se a posição de pré-venda permite cancelamento.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "01",
 *      "nome": "SEPARAÇÃO",
 *      "faturar": false,
 *      "alterar": false,
 *      "cancelar": false
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /tiposcobrancas/:id  Consultar tipos de cobranças
 * @apiVersion 1.0.0
 * @apiName getTiposCobrancas
 * @apiGroup Cobranca
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) do tipo de cobrança. Quando não informado, a requisição retornará um array tipos de cobranças.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id          ID (código) do tipo de cobrança.
 * @apiSuccess {String}   descricao   Descrição do tipo de cobrança.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "01",
 *      "descricao": "COBRANÇA INTERNA"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /tiposdocumentos/:id  Consultar tipos de documentos
 * @apiVersion 1.0.0
 * @apiName getTiposDocumentos
 * @apiGroup Outros
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) do tipo de documento. Quando não informado, a requisição retornará um array tipos de documentos.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id          ID (código) do tipo de documento.
 * @apiSuccess {String}   descricao   Descrição do tipo de documento.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "DP",
 *      "descricao": "DUPLICATA"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /transportadoras/:id  Consultar transportadoras
 * @apiVersion 1.0.0
 * @apiName getTransportadoras
 * @apiGroup Outros
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) da transportadora. Quando não informado, a requisição retornará um array de transportadoras.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id            ID (código) da transportadora.
 * @apiSuccess {String}   nome          Nome da transportadora.
 * @apiSuccess {String}   via_transp    Via de transporte.
 * @apiSuccess {String}   endereco      Endereço da transportadora.
 * @apiSuccess {String}   numero_end    Número do estabelecimento.
 * @apiSuccess {String}   bairro        Nome do bairro.
 * @apiSuccess {String}   cidade        Nome da cidade.
 * @apiSuccess {String}   id_municipio  ID do município, conforme tabela do IBGE.
 * @apiSuccess {String}   uf            UF.
 * @apiSuccess {String}   cep           CEP.
 * @apiSuccess {String}   telefone      Número do telefone.
 * @apiSuccess {String}   contato       Nome da pessoa de contato.
 * @apiSuccess {String}   cnpj          CNPJ da transportadora.
 * @apiSuccess {String}   insc_estadual Inscrição Estadual da transportadora.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
        "id": "013",
        "nome": "TRANSPORTADORA SAYMON",
        "via_transp": "RODOVIARIO",
        "endereco": "RUA MAGALHAES FILHO",
        "numero_end": "123",
        "bairro": "AEROPORTO",
        "cidade": "TERESINA",
        "id_municipio": "2211001",
        "uf": "PI",
        "cep": "64002-450",
        "telefone": "(86) 3223-6661",
        "contato": "NATAN",
        "cnpj": "12.123.123/0001-12",
        "insc_estadual": "12.123.123-1"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /usuarios/:id  Consultar usuários
 * @apiVersion 1.0.0
 * @apiName getUsuarios
 * @apiGroup Usuarios
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) do usuário. Quando não informado, a requisição retornará um array de usuários.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id          ID (código) do usuário.
 * @apiSuccess {String}   nome        Nome do usuário.
 * @apiSuccess {Number}   id_nivel    Nivel do usuário.
 * @apiSuccess {String[]} lojas       Array contendo a lista de lojas acessadas pelo usuário.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "JNS",
 *      "nome": "JOSENILSON",
 *      "id_nivel": 1,
 *      "lojas": ["01", "02", "03"]
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */

