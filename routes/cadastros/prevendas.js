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
      let prevenda
      const {idLoja, numero} = req.params
      req.login.usuario.validateLoja(idLoja)
      prevenda = new PreVenda()
      prevenda.getByNumero(idLoja, numero)
        .then(found => {
          if (!found) {
            throw new createError.NotFound('Pré-venda ' + numero + ' não encontrada na loja ' + idLoja + ' !')
          }
          res.status(200).json(prevenda.data)
        })
        .catch(error => next(error))
    })
  }

  setRouteValidate() {
    const route = this.app.route(this.app.get('path-api') + '/prevendas/:idLoja/:numero/validate')    
    route.get( (req, res, next) => {
      let sitPreVenda
      const {idLoja, numero} = req.params
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
      let dataIni, dataFim, situacao, cliente, loja, vendedor, page, msgErro, prevenda
      dataIni  = req.query.data_ini || req.body.data_ini || ''
      dataFim  = req.query.data_fim || req.body.data_fim || ''
      situacao = req.query.situacao || req.body.situacao || ''
      cliente  = req.query.cliente  || req.body.cliente  || ''
      vendedor = req.query.vendedor || req.body.vendedor || ''
      loja     = req.query.loja     || req.body.loja     || ''
      page     = req.query.page     || req.body.page     || ''      

      msgErro = ! loja    ? 'a loja' :
                ! dataIni ? 'a data inicial' :
                ! dataFim ? 'a data final' :
                ! page    ? 'a página' :
                ! (vendedor || cliente) ? 'o vendedor' : ''
      if (msgErro) {
        next( new createError.BadRequest( 'Falta informar ' + msgErro + '!') )
      }
      prevenda = new PreVenda()
      prevenda.getByPeriodo(dataIni, dataFim, situacao, loja, vendedor, cliente, page)
        .then(found => {
          if (!found) {
            throw new createError.NotFound('Pré-vendas não encontradas!')
          }
          res.status(200).json(prevenda.data)
        })
        .catch(error => next(error))
    })
  }
}

module.exports = (app) => new RotaPreVenda(app)