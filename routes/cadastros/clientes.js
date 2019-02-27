const Cliente = require('../../models/cliente')

class RotaClientes {
  
  constructor(app) {
    this.app = app
    this.setRoutePost()
    this.setRoutePut()
    this.setRouteDelete()
  }


  setRoutePost() {
    const route = this.app.route(this.app.get('path-api') + '/clientes')    
    route.post((req, res, next) => {

      req.body.id = ''
      req.body.id_usuario = req.login.usuario.data.id       
      this.saveCliente(true, req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRoutePut() {
    const route = this.app.route(this.app.get('path-api') + '/clientes/:id')
    route.put((req, res, next) => {

      req.body.id = req.params.id
      this.saveCliente(false, req.body)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }


  setRouteDelete() {
    const route = this.app.route(this.app.get('path-api') + '/clientes/:id')
    route.delete((req, res, next) => {
      Cliente.delete(req.params.id)
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))
    })
  }


  saveCliente(novo, data) {
    const cliente = new Cliente()
    cliente.data = data
    return novo ? cliente.create() : cliente.update()
  }

}

module.exports = (app) => new RotaClientes(app)
