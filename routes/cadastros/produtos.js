const createError = require('http-errors')
const Produto = require('../../models/produto')

class RotaProdutos {

  constructor(app) {
    this.produto = new Produto()
    this.app = app
    this.setRouteGet()
    this.setRouteGetEstoquesLojas()
    this.setRouteGetEstoquesLojasGrades()
    this.setRouteGetPrecosTabelas()
    this.setRouteGetPrecosPlanos()
  }

  setRouteGet() {
    const route = this.app.route(this.app.get('path-api') + '/produtos/:id?')    
    route.get( (req, res, next) => {
      let page, promise
      if ( ! (req.login && req.login.idLoja) ) {
        throw new createError.BadRequest('Loja não informada!') 
      }
      this.produto.idLoja = req.login.idLoja
      page = parseInt(req.query.page) || 0
      promise = req.params.id        ? this.produto.findById(req.params.id) : 
                req.query.codBarras  ? this.produto.findByCodigoBarras(req.query.codBarras) :
                req.query.referencia ? this.produto.findByReferencia(req.query.referencia):
                                       ''
      if (promise) {
        promise
          .then(found => {
            if (!found) {
              throw new createError.NotFound('Produto não encontrado!')
            }

            res.status(200).json(this.produto.data)
          })
          .catch(error =>next(error))
        return
      } 
      
      promise = req.query.descricao ? this.produto.findByDescricao(req.query.descricao, page) :
                req.query.parcial   ? this.produto.findByDescricaoParcial(req.query.parcial, page) :
                                      this.produto.getAll({field: 'descricao', order: 1}, page)
      promise
        .then(lista => {
          if (!lista.length) {
            throw new createError.NotFound('Produtos não encontrados!')
          }
          res.status(200).json(lista.map(produto => produto.data))
        })
        .catch(error =>next(error))
    })
  }


  setRouteGetEstoquesLojas() {
    const route = this.app.route(this.app.get('path-api') + '/produtos/:idprod/estoques/:idloja?')    
    route.get( (req, res, next) => {
      Produto.estoqueLoja(req.params.idprod, req.params.idloja)
        .then(rows => res.status(200).json(rows))
        .catch(error => next(error))
    })
  }


  setRouteGetEstoquesLojasGrades() {
    const route = this.app.route(this.app.get('path-api') + '/produtos/:idprod/estoques/:idloja/grades/:posgrade?')    
    route.get( (req, res, next) => {
      Produto.estoqueLojaGrade(req.params.idprod, req.params.idloja, req.params.posgrade)
        .then(rows => res.status(200).json(rows))
        .catch(error => next(error))
    })
  }


  setRouteGetPrecosTabelas() {
    const route = this.app.route(this.app.get('path-api') + '/produtos/:idprod/precos/:idtab?')    
    route.get( (req, res, next) => {
      if ( ! (req.login && req.login.idLoja) ) {
        throw new createError.BadRequest('Loja não informada!')
      }
      Produto.precoVenda(req.params.idprod, req.login.idLoja, req.params.idtab)
        .then(rows => res.status(200).json(rows))
        .catch(error => next(error))
    })
  }

  setRouteGetPrecosPlanos() {
    const route = this.app.route(this.app.get('path-api') + '/produtos/:idprod/precos/:idtab/planos/:idplano?')    
    route.get( (req, res, next) => {
      if ( ! (req.login && req.login.idLoja) ) {
        throw new createError.BadRequest('Loja não informada!') 
      }
      Produto.precoVendaPlano(req.params.idprod, req.login.idLoja, req.params.idtab, req.params.idplano)
        .then(rows => res.status(200).json(rows))
        .catch(error => next(error))
    })
  }

  static start(app) {
    return new RotaProdutos(app)
  }

}

module.exports = (app) => { RotaProdutos.start(app) }


