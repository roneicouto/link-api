const createError = require('http-errors')
const Orcamento = require('../../models/orcamento')
const Venda = require('../../models/venda')


class RotaOrcamento {
  
  constructor(app) {
    this.app = app
    this.setRoutePost()    
    this.setRouteGetNumero()
    this.setRouteGetItens()
    this.setRouteGetPeriodo()
  }


  setRoutePost() {
    const route = this.app.route(this.app.get('path-api') + '/orcamentos')    
    route.post((req, res, next) => {

      req.body.id_loja     = req.login.idLoja
      req.body.id_usuario  = req.login.usuario.data.id
      req.body.id_vendedor = req.login.usuario.data.id_vendedor
      Venda.gerarOrcamento(req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRouteGetNumero() {
    const route = this.app.route(this.app.get('path-api') + '/orcamentos/:numero')    
    route.get((req, res, next) => {

      this.buscarOrcamento(req)
        .then(result => res.status(200).json(result))
        .catch(error => next(error))

    })
  }


  setRouteGetItens() {
    const route = this.app.route(this.app.get('path-api') + '/orcamentos/:numero/itens')    
    route.get((req, res, next) => {

      this.buscarOrcamento(req)
        .then(result => res.status(200).json(result.itens))
        .catch(error => next(error))

    })
  }


  async buscarOrcamento(req) {
    let idLoja = req.login.idLoja
    let numero = req.params.numero
    let orcamento = await Orcamento.getInstance(idLoja, numero)

    if (! orcamento.data) 
      throw new createError.NotFound('Orçamento ' + numero + ' não encontrada na loja ' + idLoja + ' !')
    
    if (orcamento.data.id_vendedor !== req.login.usuario.data.id_vendedor) 
      throw new createError.Unauthorized('Acesso não autorizado ao orçamento ' + numero + ' da loja ' + idLoja + ' !')      
  
    return orcamento.data
  }


  setRouteGetPeriodo() {
    const route = this.app.route(this.app.get('path-api') + '/orcamentos')    
    route.get( (req, res, next) => {

      const getOrcamentos = async () => {
        req.query.id_loja     = req.login.idLoja
        req.query.id_vendedor = req.login.usuario.data.id_vendedor
        let lista = await new Orcamento().findByPeriodo(req.query)
        if (! lista.length) {
          throw new createError.NotFound('Orçamentos não encontrados!')
        }
        return lista.map(orcamento => orcamento.data)
      }
      
      getOrcamentos()
        .then(lista => res.status(200).json(lista))
        .catch(error => next(error))

    })
  }
}

module.exports = (app) => new RotaOrcamento(app)


/**
 * @apiDefine ErroOrcamentoNaoEncontrado
 * 
 * @apiError {Number} status  Código do status HTTP.
 * @apiError {String} message Mensagem de erro.
 *
 * @apiErrorExample Erro:
 *     HTTP/1.1 404 
 *     {
 *       "status": 404,
 *       "message": "Orçamento 6756 não encontrado na loja 01 !"
 *     }
*/


/** 
 * @apiDefine CamposOrcamento
 * 
 * @apiSuccess {String}   id_loja        ID da loja onde o orçamento foi gerado
 * @apiSuccess {String}   numero         Número da orçamento.
 * @apiSuccess {Date}     data           Data de geração do orçamento.
 * @apiSuccess {String}   id_vendedor    ID do vendedor.
 * @apiSuccess {String}   nome_vendedor  Nome do vendedor.
 * @apiSuccess {String}   id_cliente     ID do cliente.
 * @apiSuccess {String}   nome_cliente   Nome do cliente.
 * @apiSuccess {String}   id_tab_preco   ID da tabela de preço usada no orçamento.
 * @apiSuccess {String}   id_parceiro    ID do parceiro (indicador).
 * @apiSuccess {Number}   qt_itens       Número de itens lançados no orçamento.
 * @apiSuccess {Number}   vl_itens       Valor da soma total dos itens.
 * @apiSuccess {Number}   vl_acrescimo   Valor de acréscimo sobre os itens.
 * @apiSuccess {Number}   vl_desconto    Valor de desconto sobre os itens.
 * @apiSuccess {Number}   vl_total       Valor total do orçamento.
 * @apiSuccess {String}   id_plano_pag   ID do plano de pagamento.
 * @apiSuccess {String}   nome_plano_pag Nome do plano de pagamento.
 * @apiSuccess {String}   forma_pag      ID da forma de pagamento gerada pelo plano.
 * @apiSuccess {Number}   vl_entrada     Valor de entrada, para o caso de venda a prazo.
 * @apiSuccess {Number}   parcelas       Número de parcelas de pagamento geradas.
 * @apiSuccess {Number}   vl_parcela     Valor da parcela de pagamento.
 * @apiSuccess {String}   situacao       Situação da orçamento: P-Pendente F-Faturado C-Cancelado
 * @apiSuccess {Date}     data_entrega   Data prevista para entrega dos produtos.
 * @apiSuccess {String}   hora_entrega   Hora prevista para entrega dos produtos.
 * @apiSuccess {String}   id_opcom       ID da operação comercial de venda.
 * @apiSuccess {String}   num_venda      Número da venda gerada na operação comercial.
 * @apiSuccess {Date}     data_venda     Data da venda gerada.
 * @apiSuccess {String}   num_nfe        Número da NF-e ou NFC-e gerada.
 * @apiSuccess {Object[]} itens          Array contendo a lista de itens do orçamento.
 */

 /**
  * @apiDefine orItem Campos do item do orçamento
  */

 /**  
  * @apiDefine CamposItensOrcamento
  * 
  * @apiSuccess (pvItem) {String}   seq           Sequência do item.
  * @apiSuccess (pvItem) {String}   id_produto    Código do produto ou serviço.
  * @apiSuccess (pvItem) {String}   descricao     Descrição do item.
  * @apiSuccess (pvItem) {String}   referencia    Referência do item.
  * @apiSuccess (pvItem) {String}   especie       Espécie do item: P-Produto ou S-Serviço.
  * @apiSuccess (pvItem) {String}   compl_descr   Complemento da descrição do item.
  * @apiSuccess (pvItem) {String}   pos_grade     Posição da grade do produto no formato 9999.
  * @apiSuccess (pvItem) {String}   lin_grade     Descrição da linha da grade.
  * @apiSuccess (pvItem) {String}   col_grade     Descrição da coluna da grade.
  * @apiSuccess (pvItem) {Number}   quantidade    Quantidade do item.
  * @apiSuccess (pvItem) {Boolean}  fracionado    Indica se o item foi vendido em unidades fracionadas.
  * @apiSuccess (pvItem) {Number}   preco         Preço unitário do item.
  * @apiSuccess (pvItem) {Number}   pdesc         Percentual e desconto sobre o preço do item.
  * @apiSuccess (pvItem) {Number}   vl_total      Valor total do item.
  * @apiSuccess (pvItem) {Boolean}  promocao      Indica se o produto foi vendido com preço de promoção.
*/


 /** 
  * @apiDefine SucessoOrcamento
  * 
  * @apiSuccessExample Sucesso:
  *     HTTP/1.1 200 OK
  *     {
  *        "id_loja":"00",
  *        "numero":"2027",
  *        "data":"2015-12-14T02:00:00.000Z",
  *        "id_vendedor":"001",
  *        "nome_vendedor":"LUIS CARLOS",
  *        "id_cliente":"00000001",
  *        "nome_cliente":"FRANCISCO OLIVEIRA COSMETICOS LTDA",
  *        "id_tab_preco":"01",
  *        "id_parceiro":"00034",
  *        "qt_itens":1,
  *        "vl_itens":152.25,
  *        "vl_acrescimo":0,
  *        "vl_desconto":10.10,
  *        "vl_total":142.15,
  *        "id_plano_pag":"001",
  *        "nome_plano_pag":"A VISTA",
  *        "forma_pag":"01",
  *        "vl_entrada":0,
  *        "parcelas":0,
  *        "vl_parcela":0,
  *        "situacao":"F",
  *        "data_entrega":"2015-12-14T02:00:00.000Z",
  *        "hora_entrega":"15:00:00",
  *        "id_opcom":"10",
  *        "num_venda":"5219",
  *        "data_venda":"2015-12-14T02:00:00.000Z",
  *        "num_nfe":"40",
  *        "itens":[
  *            {
  *              "seq":"001",
  *              "id_produto":"00001",
  *              "cod_barras":"9788537909294",
  *              "descricao":"LEITE ITAMBE PLUS CXA C/20 UND",
  *              "referencia":"ABC-DEF-GHI-JKLM-NOP",
  *              "especie":"P",
  *              "compl_descr":"",
  *              "pos_grade":"",
  *              "lin_grade":"",
  *              "col_grade":"",
  *              "quantidade":1,
  *              "fracionado":false,
  *              "unidade":"CXA",
  *              "preco":152.25,
  *              "pdesc":0,
  *              "vl_total":152.25,
  *              "promocao":false
  *            }
  *        ]
  *     }
  */ 

/**
 * @apiDefine Orcamentos Orçamentos
 */

/**
 * @api {post} /orcamentos  Gerar uma novo orçamento
 * @apiVersion 1.0.0
 * @apiName postOrcamento
 * @apiGroup Orcamentos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 *
 * @apiParam {Number}   id_venda          ID da venda temporária a ser transformada em orçamento.
 * @apiParam {String}   id_cliente        ID (código) do cliente.
 * @apiParam {String}   id_vendedor       ID do vendedor.
 * @apiParam {String}   id_tab_preco      ID da tabela de preço.
 * @apiParam {String}   id_plano_pag      ID do plano de pagamento.
 * @apiParam {Number}   vl_itens          Valor total dos produtos.
 * @apiParam {Number}   vl_desconto       Valor do desconto concedido nos produtos.
 * @apiParam {Number}   vl_acrescimo      Valor do acréscimo sobre os produtos.
 * @apiParam {Number}   vl_total          Valor total da venda.
 * @apiParam {Number}   [vl_entrada]      Valor de entrada, caso a venda seja a prazo.
 * @apiParam {Number}   [parcelas]        Quantidade de parcelas de pagamento, se a venda for a prazo.
 * @apiParam {Number}   [vl_parcela]      Valor da parcela de pagamento, se a venda for a prazo.
 * @apiParam {Date}     [data_entrega]    Data de entrega dos produtos.
 * @apiParam {String}   [hora_entrega]    Horario previsto para entrega (HH:MM).
 * @apiParam {String}   [id_parceiro]     ID do parceiro (indicador).
 * @apiParam {String}   [obs]             Observações referentes a venda.
 *  
 * @apiSuccess {Boolean}  sucesso        Retorna sempre <code>true</code>.
 * @apiSuccess {String}   id_loja        ID da loja onde o orçamento foi gerado.
 * @apiSuccess {String}   numero         Número do orçamento gerado.
 * @apiSuccess {Number}   vl_total       Valor total do orçamento gerado.
 * 
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "sucesso": true,
 *      "id_loja": "01",
 *      "numero": "123346",
 *      "vl_total": 2359.25
 *    }
 *
 * @apiUse ErroOrcamentoNaoEncontrado
 */


/**
 * @api {get} /orcamentos/:numero  Consultar um orçamento pelo número
 * @apiVersion 1.0.0
 * @apiName getOrcamentosNumero
 * @apiGroup Orcamentos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 *
 * @apiParam {String}   numero            Número do orçamento a ser consultado.
 * 
 * @apiUse CamposOrcamento
 * @apiUse CamposItensOrcamento
 * 
 * @apiUse SucessoOrcamento
 *
 * @apiUse ErroOrcamentoNaoEncontrado
 */


 /**
 * @api {get} /orcamentos/:numero/itens  Consultar os itens de um orçamento
 * @apiVersion 1.0.0
 * @apiName getOrcamentosNumeroItens
 * @apiGroup Orcamentos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 *
 * @apiParam {String}   numero Número do orçamento a ser consultado.
 * 
 * @apiUse CamposItensOrcamento
 * 
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *     [ 
 *        {
 *           "seq":"001",
 *           "id_produto":"00001",
 *           "cod_barras":"9788537909294",
 *           "descricao":"LEITE ITAMBE PLUS CXA C/20 UND",
 *           "referencia":"ABC-DEF-GHI-JKLM-NOP",
 *           "especie":"P",
 *           "compl_descr":"",
 *           "pos_grade":"",
 *           "lin_grade":"",
 *           "col_grade":"",
 *           "quantidade":1,
 *           "fracionado":false,
 *           "unidade":"CXA",
 *           "preco":152.25,
 *           "pdesc":0,
 *           "vl_total":152.25,
 *           "promocao":false
 *        }
 *     ]
 *
 * @apiError {Number} status  Código do status HTTP.
 * @apiError {String} message Mensagem de erro.
 *
 * @apiErrorExample Erro:
 *     HTTP/1.1 404 
 *     {
 *       "status": 404,
 *       "message": "Os itens do orçamento não foram encontrados !"
 *     }
 */



 /**
 * @api {get} /orcamentos  Consultar orçamentos no periodo
 * @apiVersion 1.0.0
 * @apiName getOrcamentos
 * @apiGroup Orcamentos
 * @apiDescription Esta requisição retorna um array de orçamentos geradas no período informado, de acordo com a página informada. Os itens dos orçamentos não serão retornados.
 * 
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 *
 * @apiParam {date}   data_ini        Data inicial do periodo.
 * @apiParam {date}   data_fim        Data final do período.
 * @apiParam {Number} page            Número da página.
 * @apiParam {String} [id_cliente]    ID do cliente.
 * @apiParam {String} [id_plano_pag]  Lista de ID de planos de pagamentos, separados por "|". Ex.: "001|005|012"
 * @apiParam {String} [situacao]      Lista de situações, separadas por "|". Ex.: "P|C|F" para consultar orçamentos Pendentes, Cancelados e Faturados.
 * 
 * @apiError {Number} status  Código do status HTTP.
 * @apiError {String} message Mensagem de erro.
 *
 * @apiErrorExample Erro:
 *     HTTP/1.1 404 
 *     {
 *       "status": 404,
 *       "message": "Orçamentos não encontrados!"
 *     }
 */
