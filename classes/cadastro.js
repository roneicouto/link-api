const createError = require('http-errors')
const knex = require('../knex/knexload')

module.exports = class Cadastro {

  constructor(table, fieldID = 'id') {
    this.table = table
    this.fieldID = fieldID
    this.knex = knex
    this.data = {}
  }


  findById(id) {
    return this.executeSql(
      this.knex(this.table).where(this.fieldID, id)
    )
  }


	findByField(field, operator, text) {
    return this.executeSql(
      this.knex(this.table).where(field, operator, text).limit(1)      
    )
	}


	findByFilter(filter) {
		if (typeof filter !== "object") {
			throw new createError.BadRequest('Objeto para filtro de consulta inválido!')
    }
    return this.executeSql(
      this.knex(this.table).where(filter).limit(1)
    )
	}


	async executeSql(sqlBuilder) {
    const rows = await sqlBuilder
    if (!rows.length) {
      this.data = {}
      return false
    }
    this.data = await this.setData(rows[0])
    return true
  }


  setData(row) {
	  return Promise.resolve(row)
  }


  async getAll(params = {}) {
    params.page    = params.page  || 0
    params.rows    = params.rows  || 0
    params.where   = params.where || []
    params.order   = params.order || []
    params.count   = !!params.count

    const sqlBuilder = this.knex(this.table)

    if (! Array.isArray(params.where)) 
      params.where = [params.where]  

    params.where.forEach(p => { sqlBuilder.where(p.field, p.operator, p.value) })

    let result = {}, promises = []
    
    if (params.count) {
      promises.push(sqlBuilder.clone().count('* as c')
                      .then(rows => result.count = parseInt(rows[0].c)))
    }

    if (! Array.isArray(params.order)) 
      params.order = [params.order]

    params.order.forEach(o => { 
      if (o.field)
        sqlBuilder.orderBy(o.field, o.desc && 'desc' || 'asc') 
      else
        sqlBuilder.orderByRaw(o)
    })

    if (params.page > 0) 
      sqlBuilder.offset((params.page - 1) * params.rows)

    if (params.rows > 0) 
      sqlBuilder.limit(params.rows)

    promises.push(sqlBuilder.map(row => Object.create(this).setData(row))
                    .then(rows => params.count ? result.rows = rows : result = rows))

    await Promise.all(promises)

    return result

  }


  static async getInstance(ClassName, value, field = 'id') {
    let obj = new ClassName()
    let found = await obj.findByField(field, '=', value)
    return found ? obj : {}
  }
    

}