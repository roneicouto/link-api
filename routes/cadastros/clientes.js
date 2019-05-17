const Cliente = require('../../models/cliente')

module.exports = (app) => {
  
  const path = app.get('path-api') + '/clientes'

  app.post(path, (req, res, next) => {

    req.body.id         = ''
    req.body.id_loja    = req.login.idLoja      
    req.body.id_usuario = req.login.usuario.data.id       
    saveCliente(true, req.body)
      .then(result => res.status(result.sucesso ? 200 : 400).json(result))
      .catch(error => next(error))

  })

  

  app.put(path + '/:id', (req, res, next) => {

    req.body.id         = req.params.id
    req.body.id_loja    = req.login.idLoja      
    req.body.id_usuario = req.login.usuario.data.id       
    saveCliente(false, req.body)
      .then(result => res.status(result.sucesso ? 200 : 400).json(result))
      .catch(error => next(error))

  })



  app.delete(path + '/:id', (req, res, next) => {  

    Cliente.delete(req.params.id)
      .then(result => res.status(result.sucesso ? 200 : 400).json(result))
      .catch(error => next(error))

  })

}



function saveCliente(novo, data) {
  const cliente = new Cliente()
  cliente.data = data
  return novo ? cliente.create() : cliente.update()
}



/**
 * @apiDefine ParamsCadastroCliente
 * 
 * @apiParam {String}   nome            Nome completo ou razão social do cliente.
 * @apiParam {String}   [nome_fantasia] Nome fantasia do cliente, se pessoa jurídica.
 * @apiParam {String}   [apelido]       Apelido do cliente.
 * @apiParam {String}   pessoa          J - pessoa jurídica ou F - pessoa física.
 * @apiParam {String}   cpf_cnpj        CPF ou CNPJ do cliente, sem formatação.
 * @apiParam {String}   [insc_estadual] Número da Inscrição Estadual do cliente pessoa jurídica.
 * @apiParam {String}   endereco        Endereço do cliente.
 * @apiParam {String}   numero_end      Número do estabelecimento do cliente.
 * @apiParam {String}   bairro          Bairro do cliente.
 * @apiParam {String}   cidade          Cidade do cliente.
 * @apiParam {String}   id_municipio    ID (código) do município do cliente conforme tabela do IBGE.
 * @apiParam {String}   uf              Sigla da unidade federativa do cliente.
 * @apiParam {String}   cep             CEP do cliente, sem formatação.
 * @apiParam {String}   [ponto_ref]     Ponto de referência para o endereço do cliente.
 * @apiParam {String}   [telefone]      Número do telefone de contato do cliente no formato (99) 9999-9999 ou (99)99999-9999.
 * @apiParam {String}   [celular]       Número do telefone celular do cliente no formato (99)99999-9999.
 * @apiParam {String}   [email]         E-mail do cliente.
 * @apiParam {Date}     [data_nasc]     Data de nascimento do cliente.
 * @apiParam {String}   [sexo]          M - Masculino ou F - Feminino. Obrigatório quando for pessoa física.
 * @apiParam {Boolean}  consumidor      Indica se o cliente é consumidor final.
 * @apiParam {String}   [crt]           Código de Regime de Tributação. Obrigatório quando for pessoa jurídica.
 * 
*/

/**
 * @api {get} /clientes/:id  Consultar clientes
 * @apiVersion 1.0.0
 * @apiName getClientes
 * @apiGroup Clientes
 *
 * @apiHeader {String} Authorization Token obtido no login do usuário.
 * 
 * @apiParam {String}   [id]      ID (código) ou CPF ou CNPJ do cliente sem formatação. Quando não informado, a requisição retornará um array de clientes.
 * @apiParam {String}   [order]   Campo a ser utilizado na busca e ordenação dos registros. Somente quando <code>id</code> não for informado.
 * @apiParam {String}   [value]   Conteudo do campo de busca informado.
 * @apiParam {Number}   [page]    Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id              ID (código) do cliente.
 * @apiSuccess {String}   nome            Nome ou razão social do cliente.
 * @apiSuccess {String}   nome_fantasia   Nome fantasia do cliente, se pessoa jurídica.
 * @apiSuccess {String}   apelido         Apelido do cliente.
 * @apiSuccess {String}   pessoa          J - pessoa jurídica ou F - pessoa física.
 * @apiSuccess {Boolean}  ativo           Indica se o cliente está ativo (true) ou inativo (false).
 * @apiSuccess {Date}     data_cad        Data do cadastro do cliente.
 * @apiSuccess {Date}     data_atu        Data da última atualização do cadastro do cliente.
 * @apiSuccess {String}   id_loja         Loja onde o cliente foi cadastrado.
 * @apiSuccess {String}   id_grupo        Grupo do cliente.
 * @apiSuccess {String}   cpf_cnpj        CPF ou CNPJ do cliente, sem formatação.
 * @apiSuccess {String}   insc_estadual   Número da Inscrição Estadual do cliente pessoa jurídica.
 * @apiSuccess {String}   endereco        Endereço do cliente.
 * @apiSuccess {String}   numero_end      Número do estabelecimento do cliente.
 * @apiSuccess {String}   bairro          Bairro do cliente.
 * @apiSuccess {String}   cidade          Cidade do cliente.
 * @apiSuccess {String}   id_municipio    ID (código) do município do cliente conforme tabela do IBGE.
 * @apiSuccess {String}   uf              Sigla da unidade federativa do cliente.
 * @apiSuccess {String}   cep             CEP do cliente, sem formatação.
 * @apiSuccess {String}   ponto_ref       Ponto de referência para o endereço do cliente.
 * @apiSuccess {String}   telefone        Número do telefone de contato do cliente.
 * @apiSuccess {String}   celular         Número do telefone celular do cliente.
 * @apiSuccess {String}   email           E-mail do cliente.
 * @apiSuccess {String}   contato         Nome da pessoa de contato, se o cliente for pessoa jurídica.
 * @apiSuccess {Date}     data_nasc       Data de nascimento do cliente.
 * @apiSuccess {String}   sexo            M - Masculino ou F - Femenino.
 * @apiSuccess {Boolean}  consumidor      Indica se o cliente é consumidor final.
 * @apiSuccess {String}   sit_cred        Situação de crédito do cliente (A - Aprovado, S - Suspenso, N - Nada consta).
 * @apiSuccess {Number}   limite_cred     Valor do limite de crédito do cliente para compras a prazo.
 * @apiSuccess {String[]} planos          Array contendo o ID dos planos de pagamento permitidos para o cliente.
 * @apiSuccess {String[]} tabelas         Array contendo o ID das tabelas de preços permitidas para o cliente.
 * @apiSuccess {Object}   financeiro      Objeto (json) contendo os dados financeiros do cliente.
 * @apiSuccess {Number}   financeiro.dias_atraso     Maior número de dias de atraso do cliente.
 * @apiSuccess {Number}   financeiro.saldo_devedor   Valor total dos débitos do cliente.
 * @apiSuccess {Number}   financeiro.saldo_acordos   Valor total dos acordos pendentes.
 * @apiSuccess {Number}   financeiro.debito_atraso   Valor total dos débitos em atraso.
 * @apiSuccess {Number}   financeiro.cheques_devol   Valor total dos cheques devolvidos.
 * @apiSuccess {Number}   financeiro.limite_disp     Valor do limite disponivel para compras a prazo.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 * {
 *     "id": "00000001",
 *     "nome": "DIST.PLASTICO EVANDRO M.OLIVEIRA",
 *     "nome_fantasia": "DISTRIBUIDORA DOS PLASTICOS",
 *     "apelido": "",
 *     "pessoa": "J",
 *     "ativo": true,
 *     "data_cad": "2007-07-16T03:00:00.000Z",
 *     "data_atu": "2019-03-05T03:00:00.000Z",
 *     "id_loja": "00",
 *     "id_grupo": "0001",
 *     "cpf_cnpj": "03594295000160",
 *     "insc_estadual": "19.445.472-0",
 *     "endereco": "RUA GENERAL LAGES",
 *     "numero_end": "1471 ",
 *     "bairro": "JOCKEY",
 *     "cidade": "TERESINA",
 *     "id_municipio": "2211001",
 *     "uf": "PI",
 *     "cep": "64048-350",
 *     "ponto_ref": "PROXIMO A LOJAS AMERICANAS",
 *     "telefone": "(86) 3233-8601",
 *     "celular": "",
 *     "contato": "GERENTE",
 *     "data_nasc": null,
 *     "sexo": "",
 *     "consumidor": false,
 *     "sit_cred": "A",
 *     "limite_cred": 13500,
 *     "planos": ["001", "002", "004"],
 *     "tabelas": ["01", "02", "03"],
 *     "financeiro": {
 *         "dias_atraso": 16,
 *         "saldo_devedor": 7058.6,
 *         "saldo_acordos": 39.47,
 *         "debito_atraso": 6837.1,
 *         "cheques_devol": 0,
 *         "limite_disp": 6441.4
 *      }
 * }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {post} /clientes  Incluir um novo cliente
 * @apiVersion 1.0.0
 * @apiName postClientes
 * @apiGroup Clientes
 *
 * @apiHeader {String} Authorization Token obtido no login do usuário.
 * 
 * @apiUse ParamsCadastroCliente
 * 
 * @apiSuccess {Boolean}   sucesso       Retorna sempre <code>true</code>.
 * @apiSuccess {String}    id_cliente    ID do cliente cadastrado.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 * {
 *     "sucesso": true,
 *     "id_cliente": "00037654",
 * }
 *
 * @apiError {Number} status  Código de status HTTP.
 * @apiError {String} message Mensagem de erro.
 *
 * @apiErrorExample Erro:
 *     HTTP/1.1 500 
 *     {
 *       "status": 500,
 *       "message": "O CPF ou CNPJ já consta no cadastro do cliente 00003739!"
 *     }
 */


 /**
 * @api {put} /clientes/:id  Alterar dados de um cliente
 * @apiVersion 1.0.0
 * @apiName puttClientes
 * @apiGroup Clientes
 *
 * @apiHeader {String} Authorization Token obtido no login do usuário.
 * 
 * @apiParam {String} id  ID (Código) do cliente a ser atualizado.
 * @apiUse ParamsCadastroCliente
 * 
 * @apiSuccess {Boolean}   sucesso       Retorna sempre <code>true</code>.
 * @apiSuccess {String}    id_cliente    ID do cliente alterado.
 *
 * @apiSuccessExample Sucesso:
 * 
 *     HTTP/1.1 200 OK
 * {
 *     "sucesso": true,
 *     "id_cliente": "00037654",
 * }
 *
 * @apiError {Boolean}  sucesso   Retorna sempre <code>false</code>.
 * @apiError {String[]} erros     Array cotendo uma lista de mensagens de erros.
 *
 * @apiErrorExample Erro:
 *  HTTP/1.1 400 
 *  {
 *    "sucesso": false,
 *    "erros": [
 *       "CPF inválido.",
 *       "Endereço não informado."
 *    ]
 *  }
 * 
 */
