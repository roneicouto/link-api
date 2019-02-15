const Cliente = require('../../models/cliente')

class RotaClientes {
  
  constructor(app) {
    this.app = app
    this.setRoutePost()
  }


  setRoutePost() {
    const route = this.app.route(this.app.get('path-api') + '/clientes')    
    route.post((req, res, next) => {

      const postCliente = async () => {
        const cliente = new Cliente()
        cliente.data = req.body
        cliente.data.id_usuario = req.login.usuario.data.id
        return cliente.create()
      }

      postCliente()
        .then(result => res.status(result.sucesso ? 200 : 400).json(result))
        .catch(error => next(error))

    })
  }
}

module.exports = (app) => new RotaClientes(app)
