const utils = require('../../utils/utils')
const createError = require('http-errors')
const PreVenda = require('../../models/prevenda')
const SitPreVenda = require('../../models/sitprevenda')


class RotaPreVenda {
  
  constructor(app) {
    this.app = app
    this.setRouteGetNumero()
    this.setRouteGetPeriodo()
    this.setRouteValidate()
  }


  setRouteGetNumero() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/:idLoja/:numero')    
    route.get( (req, res, next) => {

      const getPreVenda = async () => {
        let {idLoja, numero} = req.params        
        await req.login.usuario.validateLoja(idLoja)
        let prevenda = await PreVenda.getInstance(idLoja, numero)
        if (! prevenda.data) {
          throw new createError.NotFound('Pré-venda ' + numero + ' não encontrada na loja ' + idLoja + ' !')
        }
        return prevenda
      }

      getPreVenda()
        .then(p => res.status(200).json(p.data))
        .catch(e => next(e))

    })
  }


  setRouteValidate() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/:idLoja/:numero/validacoes')    
    route.get( (req, res, next) => {

      let sitPreVenda
      const {idLoja, numero} = req.params
      let promises = Promise.all([
        new SitPreVenda()
      ])
      req.login.usuario.validateLoja(idLoja)
      sitPreVenda = new SitPreVenda(idLoja, numero)
      sitPreVenda.validate(req.login.usuario.id_nivel)
        .then( ok => {
          if (! ok) {
            res.status(400).json(sitPreVenda.data)
          }
          res.status(200).json(sitPreVenda.data)
        })
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
        return new PreVenda().findByPeriodo(filter)
      }
      
      getPreVendas()
        .then(lista => {
          if (! lista.length) {
            throw new createError.NotFound('Pré-vendas não encontradas!')
          }
          res.status(200).json(lista.map( prevenda => prevenda.data))
        })
        .catch(error => next(error))
    })
  }
}

module.exports = (app) => new RotaPreVenda(app)