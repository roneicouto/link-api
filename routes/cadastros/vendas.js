const Venda = require('../../models/venda')

class RotaVenda {
  
  constructor(app) {
    this.app = app
    this.setRouteAlterarTabPreco()    
    this.setRoutePostItem()
    this.setRoutePutItem()
    this.setRouteDeleteItem()
    this.setRouteGetItem()
  }


  setRoutePostItem() {
    const route = this.app.route(this.app.get('path-api') + '/venda-itens')    
    route.post((req, res, next) => {

      req.body.id_loja    = req.login.idLoja
      req.body.id_usuario = req.login.usuario.data.id
      Venda.saveItem(req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRoutePutItem() {
    const route = this.app.route(this.app.get('path-api') + '/venda-itens/:id')
    route.put((req, res, next) => {

      req.body.id_item    = req.params.id
      req.body.id_loja    = req.login.idLoja
      req.body.id_usuario = req.login.usuario.data.id      
      Venda.saveItem(req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRouteDeleteItem() {
    const route = this.app.route(this.app.get('path-api') + '/venda-itens/:id?')    
    route.delete((req, res, next) => {

      req.body.id_item    = req.params.id
      req.body.id_loja    = req.login.idLoja
      req.body.id_usuario = req.login.usuario.data.id            

      let promise = req.params.id ? Venda.deleteItem(req.body) : Venda.delete(req.body)

      promise
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRouteGetItem() {
    const route = this.app.route(this.app.get('path-api') + '/venda-itens/:id?')    
    route.get((req, res, next) => {

      req.body.id_item    = req.params.id
      req.body.id_loja    = req.login.idLoja
      req.body.id_usuario = req.login.usuario.data.id            

      Venda.getItens(req.body)
        .then(result => res.status(result.erros ? 400 : 200).json(result))
        .catch(error => next(error))

    })
  }

  setRouteAlterarTabPreco() {
    const route = this.app.route(this.app.get('path-api') + '/venda-itens/precos')
    route.put((req, res, next) => {

      req.body.id_loja = req.login.idLoja
      req.body.id_usuario = req.login.usuario.data.id

      Venda.mudarTabelaPreco(req.body)
        .then(result => res.status(result.erros ? 400 : 200).json(result))
        .catch(error => next(error))

    })    
  }

}


module.exports = (app) => new RotaVenda(app)


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
 *       "message": "O ID 43 da venda não existe!"
 *     }
 */



/**
 * @api {post} /venda-itens  Incluir novo produto na venda
 * @apiVersion 1.0.0
 * @apiName postVendaItens
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String}   [id_venda]       ID da venda. Se não for informado, será gerada uma nova venda.
 * @apiParam {String}   id_produto       ID (código) do produto.
 * @apiParam {String}   [complemento]    Descrição complementar do produto.
 * @apiParam {String}   [posgrade]       Posição da grade do produto, se houver.
 * @apiParam {Boolean}  fracionado       Indica se o produto foi vendido em undidades fracionadas.
 * @apiParam {Number}   quantidade       Quantidade vendida do produto.
 * @apiParam {Number}   preco            Preço unitário do produto.
 * @apiParam {Number}   pdesc            Percentual de desconto concedido no produto.
 * @apiParam {Boolean}  promocao         Indica se o produto foi vendido com preço de promoção.
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
 * @api {put} /venda-itens/:id  Alterar um produto na venda
 * @apiVersion 1.0.0
 * @apiName putVendasItens
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 *
 * @apiParam {String}   id               ID do item da venda a ser alterado.  
 * @apiParam {String}   id_venda         ID da venda. 
 * @apiParam {String}   id_produto       ID (código) do produto.
 * @apiParam {String}   [complemento]    Descrição complementar do produto.
 * @apiParam {String}   [posgrade]       Posição da grade do produto, se houver.
 * @apiParam {Boolean}  fracionado       Indica se o produto foi vendido em undidades fracionadas.
 * @apiParam {Number}   quantidade       Quantidade vendida do produto.
 * @apiParam {Number}   preco            Preço unitário do produto.
 * @apiParam {Number}   pdesc            Percentual de desconto concedido no produto.
 * @apiParam {Boolean}  promocao         Indica se o produto foi vendido com preço de promoção.
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
 * @api {put} /venda-itens/precos  Alterar a tabela de preço dos itens da venda
 * @apiVersion 1.0.0
 * @apiName putVendasItensPrecos
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 *
 * @apiParam {String}   id_venda         ID da venda. 
 * @apiParam {String}   id_tab_preco     ID (código) da nova tabela de preços.
 * 
 * @apiSuccess {Boolean}  sucesso        Retorna sempre <code>true</code>.
 * @apiSuccess {Number}   vl_total       Valor total dos itens da venda atualizados conforme a nova tabela de preços.
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
 * @api {delete} /venda-itens/:id  Excluir um produto da venda
 * @apiVersion 1.0.0
 * @apiName deleteVendasItens
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 *
 * @apiParam {String}   id               ID do item da venda a ser excluido.
 * @apiParam {String}   id_venda         ID da venda. 
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
 * @api {delete} /venda-itens  Excluir todos os itens de uma venda
 * @apiVersion 1.0.0
 * @apiName deleteVendas
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
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
