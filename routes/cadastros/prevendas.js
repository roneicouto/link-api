const utils = require('../../utils/utils')
const createError = require('http-errors')
const PreVenda = require('../../models/prevenda')
const SitPreVenda = require('../../models/sitprevenda')


class RotaPreVenda {
  
  constructor(app) {
    this.app = app
    this.setRouteGetNumero()
    this.setRouteGetItens()
    this.setRouteGetPeriodo()
    this.setRouteValidate()
    this.setRoutePost()
  }


  setRoutePost() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas')    
    route.post((req, res, next) => {

      const postPreVenda = async () => {
        const prevenda = new PreVenda()
        prevenda.data = req.body
        await prevenda.save(true)
        return prevenda
      }

      postPreVenda()
        .then(prevenda => res.status(200).json({sucesso: true, numero: prevenda.data.numero}))
        .catch(error => next(error))

    })
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

      const getSituacaoPreVenda = async () => {
        let {idLoja, numero} = req.params
        await req.login.usuario.validateLoja(idLoja)
        return new SitPreVenda(idLoja, numero).validate()
      }
      
      getSituacaoPreVenda()
      .then(sitPV => sitPV.irregular ? res.status(400).json({sucesso: false, pendencias: sitPV.data})
                                     : res.status(200).json({sucesso: true}))
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