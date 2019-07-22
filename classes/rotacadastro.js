const createError = require('http-errors')

module.exports = class RotaCadastro {

  constructor(app, route, ClassCadastro) {
    this.cadastro = new ClassCadastro()
    this.route    = app.route(app.get('path-api') + route)
    this.routeID  = app.route(this.route.path + '/:id')  
  }

  setRouteGet() {

    this.route.get( (req, res, next) => {

      const params = { 
        page: parseInt(req.query.page) || 0,
        rows: parseInt(req.query.rows) || 0,
        order: [req.query.order || 'id'],
        count: !!req.query.count
      }

      if (req.query.value) {
        params.where = [{ 
          field: params.order[0],
          operator: '~',
          value: req.query.value
        }]
      }

      this.cadastro.getAll(params)
        .then(resp => {
          const rows = resp.count ? resp.rows : resp
          if (! rows.length) {
            throw new createError.NotFound('Registros não encontrados!')
          } 
          res.status(200).json(resp)
        })
        .catch(error =>next(error))
    })

  }


  setRouteGetId() {
    this.routeID.get( (req, res, next) => {
      let promise
      if (this.cadastro.find)
        promise = this.cadastro.find(req.params.id)
      else if (this.cadastro.findById)
        promise = this.cadastro.findById(req.params.id)
      else 
        throw new createError.BadRequest('Método find() ou findById() não implementado!')

      promise
        .then( found => {
          if (! found) {
            throw new createError.NotFound('Registro não encontrado!')
          }
          res.status(200).json(this.cadastro.data) 
        })
        .catch(error => next(error))
    })
  }

  
  static start(app, route, ClassName) {
    let oRoute
    oRoute = new RotaCadastro(app, route, ClassName)
    oRoute.setRouteGet()
    oRoute.setRouteGetId()
    return oRoute
  }

}
