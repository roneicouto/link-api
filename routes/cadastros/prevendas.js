const utils = require('../../utils/utils')
const createError = require('http-errors')
const PreVenda = require('../../models/prevenda')
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

    this.setRoutePostTempItem()
    this.setRoutePutTempItem()
    this.setRouteGetTempItem()
    this.setRouteDeleteTempItem()
    this.setRouteDeleteTemp()
  }


  setRoutePostTempItem() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/temp/itens')    
    route.post((req, res, next) => {

      PreVenda.saveTempItem(true, req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRoutePutTempItem() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/temp/itens/:seq')    
    route.put((req, res, next) => {

      req.body.seq = req.params.seq
      PreVenda.saveTempItem(false, req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRouteGetTempItem() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/temp/itens/:seq?')    
    route.get((req, res, next) => {

      req.body.seq = req.params.seq || 0
      PreVenda.getTempItem(req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRouteDeleteTempItem() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/temp/itens/:seq')    
    route.delete((req, res, next) => {

      req.body.seq = req.params.seq
      PreVenda.deleteTempItem(req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRouteDeleteTemp() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/temp/:id')    
    route.delete((req, res, next) => {

      PreVenda.deleteTemp(req.params.id)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }

  
  setRoutePost() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas')    
    route.post((req, res, next) => {

      req.body.id_usuario = req.login.usuario.data.id
      this.savePreVenda(true, req.body)
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