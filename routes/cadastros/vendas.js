const Venda = require('../../models/venda')
const utils = require('../../utils/utils')

class RotaVenda {
  
  constructor(app) {
    this.app = app
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

}

module.exports = (app) => new RotaVenda(app)