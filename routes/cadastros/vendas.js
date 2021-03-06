const Venda = require('../../models/venda')

module.exports = (app) => {

  const path = app.get('path-api') + '/vendas'
  const pathItem = path + '/:id_venda/itens/:id_item'
  

  app.post(path + '/:id_venda?/itens', (req, res, next) => {

    req.body.id_venda   = req.params.id_venda      
    req.body.id_loja    = req.login.idLoja
    req.body.id_usuario = req.login.usuario.data.id
    Venda.saveItem(req.body)
      .then(result => res.status(result.sucesso ? 200 : 400).json(result))
      .catch(error => next(error))

  })



  app.put(pathItem, (req, res, next) => {

    req.body.id_venda   = req.params.id_venda
    req.body.id_item    = req.params.id_item
    req.body.id_loja    = req.login.idLoja
    req.body.id_usuario = req.login.usuario.data.id      
    Venda.saveItem(req.body)
      .then(result => res.status(result.sucesso ? 200 : 400).json(result))
      .catch(error => next(error))

  })



  app.delete(pathItem, (req, res, next) => {

    req.body.id_venda   = req.params.id_venda      
    req.body.id_item    = req.params.id_item
    req.body.id_loja    = req.login.idLoja
    req.body.id_usuario = req.login.usuario.data.id            

    Venda.deleteItem(req.body) 
      .then(result => res.status(result.sucesso ? 200 : 400).json(result))
      .catch(error => next(error))

  })



  app.delete(path + '/:id_venda', (req, res, next) => {

    req.body.id_venda   = req.params.id_venda      
    req.body.id_loja    = req.login.idLoja
    req.body.id_usuario = req.login.usuario.data.id            

    Venda.delete(req.body)
      .then(result => res.status(result.sucesso ? 200 : 400).json(result))
      .catch(error => next(error))

  })



  app.get(pathItem + '?', (req, res, next) => {

    req.body.id_venda   = req.params.id_venda
    req.body.id_item    = req.params.id_item
    req.body.id_loja    = req.login.idLoja
    req.body.id_usuario = req.login.usuario.data.id            

    Venda.getItens(req.body)
      .then(result => res.status(result.erros ? 400 : 200).json(result))
      .catch(error => next(error))

  })



  app.get(path, (req, res, next) => {

    req.body.id_loja    = req.login.idLoja
    req.body.id_usuario = req.login.usuario.data.id
    Venda.getVendas(req.body)
      .then(result => res.status(result.sucesso ? 200 : 400).json(result))
      .catch(error => next(error))

  })



  app.put(path + '/:id_venda/precos', (req, res, next) => {

    req.body.id_venda   = req.params.id_venda
    req.body.id_loja    = req.login.idLoja
    req.body.id_usuario = req.login.usuario.data.id

    Venda.mudarTabelaPreco(req.body)
      .then(result => res.status(result.erros ? 400 : 200).json(result))
      .catch(error => next(error))

  })    

}



/** 
 * @apiDefine ErroVendaNaoEncontrada
 * 
 * @apiError {Boolean}  sucesso  Retorna sempre <code>false</code>.
 * @apiError {String}   message  Mensagem de erro.
 *
 * @apiErrorExample Erro:
 *     HTTP/1.1 404 
 *     {
 *       "sucesso": false,
 *       "message": "O ID 43 da venda n??o existe!"
 *     }
 */



/**
 * @api {post} /vendas/:id_venda/itens  Incluir novo produto na venda
 * @apiVersion 1.0.0
 * @apiName postVendasItens
 * @apiGroup Vendas
 * 
 * @apiDescription Permite a inclus??o de um novo produto na venda. Se o ID da venda n??o for informado, uma nova venda ser?? gerada e vinculada ao usu??rio. 
 * @apiDescription Caso j?? exista na venda um produto com o mesmo ID (c??digo), posi????o de grade e desconto, ent??o a quantidade e valores informados na requisi????o ser??o adicionados ao produto j?? existente.
 * 
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usu??rio.
 * 
 * @apiParam {String}   [id_venda]       ID da venda. Se n??o for informado, ser?? gerada uma nova venda.
 * @apiParam {String}   [nome]           Nome para identifica????o da venda (30 caracteres), que pode ser informado apenas no primeiro item.
 * @apiParam {String}   id_produto       ID (c??digo) do produto a ser inserido na venda.
 * @apiParam {String}   [complemento]    Descri????o complementar do produto.
 * @apiParam {String}   [pos_grade]      Posi????o da grade do produto, se houver.
 * @apiParam {Boolean}  fracionado       Indica se o produto foi vendido em undidades fracionadas.
 * @apiParam {Number}   quantidade       Quantidade vendida do produto.
 * @apiParam {String}   id_tab_preco     ID da tabela de pre??o do produto.
 * @apiParam {Number}   preco            Pre??o unit??rio do produto.
 * @apiParam {Number}   pdesc            Percentual de desconto concedido no pre??o unit??rio do produto.
 * @apiParam {Boolean}  promocao         Indica se o produto foi vendido com pre??o de promo????o.
 * @apiParam {String}   [id_loja_sep]    ID da loja de separa????o do produto, caso a mesma seja diferente da loja atual.
 * 
 * @apiSuccess {Boolean}  sucesso        Retorna sempre <code>true</code>.
 * @apiSuccess {Number}   id_venda       ID da venda.
 * @apiSuccess {Number}   id_item        ID do item vendido.
 * @apiSuccess {Number}   vl_total       Valor total do item vendido.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "sucesso": true,
 *      "id_venda": 13,
 *      "id_item": 2,
 *      "vl_total": 192.55,
 *    }
 *
 * @apiUse ErroVendaNaoEncontrada
 */


 /**
 * @api {put} /vendas/:id_venda/itens/:id_item  Alterar um produto na venda
 * @apiVersion 1.0.0
 * @apiName putVendasItens
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usu??rio.
 *
 * @apiParam {String}   id_venda         ID da venda. 
 * @apiParam {String}   id_item          ID do item da venda a ser alterado.  
 * @apiParam {String}   id_produto       ID (c??digo) do produto.
 * @apiParam {String}   [complemento]    Descri????o complementar do produto.
 * @apiParam {String}   [pos_grade]      Posi????o da grade do produto, se houver.
 * @apiParam {Boolean}  fracionado       Indica se o produto foi vendido em undidades fracionadas.
 * @apiParam {Number}   quantidade       Quantidade vendida do produto.
 * @apiParam {Number}   preco            Pre??o unit??rio do produto.
 * @apiParam {Number}   pdesc            Percentual de desconto concedido no produto.
 * @apiParam {Boolean}  promocao         Indica se o produto foi vendido com pre??o de promo????o.
 * 
 * @apiSuccess {Boolean}  sucesso        Retorna sempre <code>true</code>.
 * @apiSuccess {Number}   id_venda       ID da venda.
 * @apiSuccess {Number}   id_item        ID do item alterado.
 * @apiSuccess {Number}   vl_total       Valor total do item alterado.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "sucesso": true,
 *      "id_venda": 13,
 *      "id_item": 2,
 *      "vl_total": 192.55,
 *    }
 *
 * @apiUse ErroVendaNaoEncontrada
 */


 /**
 * @api {put} /vendas/:id_venda/precos  Alterar a tabela de pre??os da venda
 * @apiVersion 1.0.0
 * @apiName putVendasItensPrecos
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usu??rio.
 *
 * @apiParam {String}   id_venda         ID da venda. 
 * @apiParam {String}   id_tab_preco     ID (c??digo) da nova tabela de pre??os.
 * 
 * @apiSuccess {Boolean}  sucesso        Retorna sempre <code>true</code>.
 * @apiSuccess {Number}   vl_total       Valor total dos itens da venda atualizados conforme a nova tabela de pre??os.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "sucesso": true,
 *      "vl_total": 1278.65,
 *    }
 *
 * @apiUse ErroVendaNaoEncontrada
 */


 /**
 * @api {delete} /vendas/:id_venda/itens/:id_item  Excluir um item da venda
 * @apiVersion 1.0.0
 * @apiName deleteVendasItens
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usu??rio.
 *
 * @apiParam {String}   id_venda         ID da venda. 
 * @apiParam {String}   id               ID do item da venda a ser excluido.
 * 
 * @apiSuccess {Boolean}  sucesso        Retorna sempre <code>true</code>.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "sucesso": true,
 *    }
 *
 * @apiUse ErroVendaNaoEncontrada
 */


 /**
 * @api {delete} /vendas/:id_venda  Excluir uma venda
 * @apiVersion 1.0.0
 * @apiName deleteVendas
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usu??rio.
 *
 * @apiParam {String}   id_venda         ID da venda a ser excluida.
 * 
 * @apiSuccess {Boolean}  sucesso        Retorna sempre <code>true</code>.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "sucesso": true,
 *    }
 *
 * @apiUse ErroVendaNaoEncontrada
 */

 /**
 * @api {get} /vendas  Consultar as vendas em andamento
 * @apiVersion 1.0.0
 * @apiName getVendasTemp
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usu??rio.
 *
 * @apiSuccess {Boolean}  sucesso             Sucesso da requisi????o.
 * @apiSuccess {Object[]} vendas              Array contendo uma lista de objetos JSON das vendas em andamento.
 * @apiSuccess {Number}   vendas.id_venda     ID da venda.
 * @apiSuccess {Date}     vendas.data_abert   Data da abertura da venda.
 * @apiSuccess {String}   vendas.hora_abert   Hora da abertura da venda.
 * @apiSuccess {String}   vendas.id_loja      ID da loja.
 * @apiSuccess {String}   vendas.id_usuario   ID do usu??rio.
 * @apiSuccess {String}   vendas.nome         Nome de identifica????o da venda.
 * @apiSuccess {String}   vendas.id_tab_preco ID da tabela de pre??o.
 * @apiSuccess {Number}   vendas.vl_total     Valor total dos itens da venda.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "sucesso": true,
 *      "vendas": [
 *          {
 *            "id_venda": 8,
 *            "data_abert": "2019-03-05",
 *            "hora_abert": "10:00:00",
 *            "id_loja": "03",
 *            "id_usuario": "JNS",
 *            "nome": "JOAO MARTINS",
 *            "id_tab_preco": "01",
 *            "vl_total": 1432.58
 *          },
 *          {
 *            "id_venda": 12,
 *            "data_abert": "2019-03-05",
 *            "hora_abert": "10:30:00",
 *            "id_loja": "03",
 *            "id_usuario": "JNS",
 *            "nome": "FERNANDA TORRES",
 *            "id_tab_preco": "01",
 *            "vl_total": 535.65
 *          }
 *      ]
 *    }
 *
 * @apiUse ErroVendaNaoEncontrada
 */

 
 /**
 * @api {get} /vendas/:id_venda/itens/:id_item  Consultar um ou mais itens de uma venda
 * @apiVersion 1.0.0
 * @apiName getVendaItens
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usu??rio.
 *
 * @apiParam {String}   id_venda         ID da venda em andamento.
 * @apiParam {String}   [id_item]        ID do item da venda. Se n??o for informado, a requisi????o retornar?? um array com todos os itens da venda.
 * 
 * @apiSuccess  {Boolean}  sucesso             Sucesso da requisi????o.
 * @apiSuccess  {Object[]} [itens]             Array contendo uma lista de objetos JSON dos itens da venda.
 * @apiSuccess  {Object}   [item]              Objeto JSON do item da venda.
 * @apiSuccess  {Number}   item.id_item        ID do item.
 * @apiSuccess  {String}   item.id_produto     ID do produto ou servi??o.
 * @apiSuccess  {String}   item.descricao      Descri????o do produto ou servi??o.
 * @apiSuccess  {String}   item.pos_grade      Posi????o de grade do produto.
 * @apiSuccess  {String}   item.complemento    Descri????o complementar do produto.
 * @apiSuccess  {Boolean}  item.fracionado     Indica se o produto foi vendido em unidade fracionada.
 * @apiSuccess  {String}   item.unidade        Unidade de venda do produto.
 * @apiSuccess  {Number}   item.quantidade     Quantidade do item.
 * @apiSuccess  {Number}   item.preco          Pre??o unit??rio do item.
 * @apiSuccess  {Number}   item.pdesc          Percentual de desconto do item.
 * @apiSuccess  {Number}   item.vl_total       Valor total do item.
 * @apiSuccess  {Boolean}  item.promocao       Indica se o item foi vendido com pre??o de promo????o.
 * @apiSuccess  {String}   item.estoque        Estoque do produto que foi reservado.
 * @apiSuccess  {String}   item.id_loja        ID da loja que fez a reserva de estoque do produto.
 * 
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "sucesso": true,
 *       "itens": [
 *           {
 *               "id_item": 1,
 *               "id_produto": "07405",
 *               "descricao": "5047 CONDU TAMPA CEGA 012/34",
 *               "pos_grade": "",
 *               "complemento": "",
 *               "fracionado": false,
 *               "unidade": "CXA",
 *               "quantidade": 2,
 *               "preco": 211.2,
 *               "pdesc": 0,
 *               "vl_total": 422.4,
 *               "promocao": false,
 *               "estoque": "L",
 *               "id_loja": "00"
 *           },
 *           {
 *               "id_item": 2,
 *               "id_produto": "35678",
 *               "descricao": "ROSCA PRD 15ACE",
 *               "pos_grade": "",
 *               "complemento": "",
 *               "fracionado": false,
 *               "unidade": "PCA",
 *               "quantidade": 3,
 *               "preco": 60,
 *               "pdesc": 0,
 *               "vl_total": 180,
 *               "promocao": false,
 *               "estoque": "L",
 *               "id_loja": "00"
 *           }
 *       ]
 *   }
 *
 * @apiUse ErroVendaNaoEncontrada
 */
