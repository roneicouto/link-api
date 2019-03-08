const utils = require('../../utils/utils')
const createError = require('http-errors')
const PreVenda = require('../../models/prevenda')
const Venda = require('../../models/venda')
const AnalisePreVenda = require('../../models/analiseprevenda')


class RotaPreVenda {
  
  constructor(app) {
    this.app = app
    this.setRouteGetNumero()
    this.setRouteGetItens()
    this.setRouteGetPeriodo()
    this.setRouteValidate()
    this.setRoutePost()
    this.setRoutePut()
  }


  setRoutePost() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas')    
    route.post((req, res, next) => {

      req.body.id_loja    = req.login.idLoja
      req.body.id_usuario = req.login.usuario.data.id
      Venda.gerarPreVenda(req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRoutePut() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/:idLoja/:numero')
    route.put((req, res, next) => {

      req.body.id_loja = req.params.idLoja
      req.body.numero = req.params.numero
      req.body.id_usuario = req.login.usuario.data.id   
      this.savePreVenda(false, req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  async savePreVenda(novo, data) {
    const prevenda = new PreVenda()
    prevenda.data = data
    let result = novo ? await prevenda.create() : await prevenda.update()
    if (result.sucesso) {
      let analise = await AnalisePreVenda.getInstance(result.id_loja, result.numero, data.id_usuario)
      result.pendencias = analise.pendencias.length
    }
    return result
  }
  

  setRouteGetNumero() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/:idLoja/:numero')    
    route.get((req, res, next) => {

      const getPreVenda = async () => {
        let {idLoja, numero} = req.params        
        await req.login.usuario.validateLoja(idLoja)
        let prevenda = await PreVenda.getInstance(idLoja, numero)
        if (! prevenda.data) {
          throw new createError.NotFound('Pré-venda ' + numero + ' não encontrada na loja ' + idLoja + ' !')
        }
        return prevenda.data
      }

      getPreVenda()
        .then(prevenda => res.status(200).json(prevenda))
        .catch(error => next(error))

    })
  }


  setRouteGetItens() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/:idLoja/:numero/itens')    
    route.get((req, res, next) => {

      const getItensPreVenda = async () => {
        let {idLoja, numero} = req.params        
        await req.login.usuario.validateLoja(idLoja)
        let itens = await PreVenda.getItens(idLoja, numero)
        if (! itens.length) {
          throw new createError.NotFound('Os itens da pré-venda não foram encontrados!')
        }
        return itens
      }

      getItensPreVenda()
        .then(itens => res.status(200).json(itens))
        .catch(error => next(error))

    })
  }



  setRouteValidate() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/:idLoja/:numero/validacoes')    
    route.get( (req, res, next) => {

      const promiseAnalise = async () => {
        let {idLoja, numero} = req.params
        await req.login.usuario.validateLoja(idLoja)
        return AnalisePreVenda.getInstance(idLoja, numero, req.login.usuario.data.id)
      }
      
      promiseAnalise()
        .then(analise => res.status(200).json(analise))
        .catch(error => next(error))
    })
  }


  setRouteGetPeriodo() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas')    
    route.get( (req, res, next) => {

      const getPreVendas = async () => {
        let filter = utils.isEmptyObject(req.body) ? req.query : req.body        
        if (filter.loja) {
          await req.login.usuario.validateLoja(filter.loja)
        } else if (req.login.usuario.data.lojas.length) {
          throw new createError.BadRequest('A loja deve ser informada!')
        }
        let lista = await new PreVenda().findByPeriodo(filter)
        if (! lista.length) {
          throw new createError.NotFound('Pré-vendas não encontradas!')
        }
        return lista.map(prevenda => prevenda.data)
      }
      
      getPreVendas()
        .then(lista => res.status(200).json(lista))
        .catch(error => next(error))

    })
  }
}

module.exports = (app) => new RotaPreVenda(app)



/**
 * @api {post} /prevendas  Gerar uma nova pré-venda
 * @apiVersion 1.0.0
 * @apiName postPreVendas
 * @apiGroup Vendas
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 *
 * @apiParam {Number}   id_venda          ID da venda a ser transformada em pré-venda.
 * @apiParam {String}   id_cliente        ID (código) do cliente.
 * @apiParam {String}   id_vendedor       ID do vendedor.
 * @apiParam {String}   id_tab_preco      ID da tabela de preço.
 * @apiParam {String}   id_plano_pag      ID do plano de pagamento.
 * @apiParam {String}   [id_pos]          ID da posição inicial da pré-venda.
 * @apiParam {String}   mod_venda         Modalidade da venda. 1-Normal 2-Futura ou 9-NFC-e
 * @apiParam {Number}   vl_tabela         Valor total dos produtos (quantidade x preço de tabela).
 * @apiParam {Number}   vl_itens          Valor total dos produtos.
 * @apiParam {Number}   vl_desconto       Valor do desconto concedido nos produtos.
 * @apiParam {Number}   vl_acrescimo      Valor do acréscimo sobre os produtos.
 * @apiParam {Number}   vl_total          Valor total da venda.
 * @apiParam {Number}   [vl_entrada]      Valor de entrada, caso a venda seja a prazo.
 * @apiParam {Number}   [parcelas]        Quantidade de parcelas de pagamento, se a venda for a prazo.
 * @apiParam {Number}   [vl_parcela]      Valor da parcela de pagamento, se a venda for a prazo.
 * @apiParam {Date}     [data_entrega]    Data de entrega dos produtos.
 * @apiParam {String}   tipo_entrega      Tipo de entrega. 0-Cliente retira ou 1-Loja entrega.
 * @apiParam {String}   [id_end_entrega]  ID do endereço de entrega do cliente.
 * @apiParam {String}   [id_loja_sep]     ID da loja de separação dos produtos.
 * @apiParam {String}   [id_obra]         ID da obra.
 * @apiParam {String}   [id_parceiro]     ID do parceiro (indicador).
 * @apiParam {String}   [obs]             Observações referentes a venda.
 * 
 * 
 * @apiSuccess {Boolean}  sucesso        Retorna sempre <code>true</code>.
 * @apiSuccess {String}   id_loja        ID da loja onde a pré-venda foi gerada.
 * @apiSuccess {String}   id_prevenda    Número da pré-venda gerada.   
 * @apiSuccess {Number}   vl_total       Valor total da pré-venda gerada.    
 * 
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "sucesso": true,
 *      "id_loja": "01",
 *      "id_prevenda": "112654",
 *      "vl_total": 1543.45
 *    }
 *
 * @apiUse ErroVendaNaoEncontrada
 */
