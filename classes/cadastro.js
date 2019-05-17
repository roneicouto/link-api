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
    params.page  = params.page  || 0
    params.rows  = params.rows  || 0
    params.where = params.where || []
    params.order = params.order || []

    const sqlBuilder = this.knex(this.table)

    if (params.page > 0) {
      sqlBuilder.offset((params.page - 1) * params.rows)
    }

    if (params.rows > 0) {
      sqlBuilder.limit(params.rows)
    }

    if (! Array.isArray(params.where)) {
      params.where = [params.where]  
    }
    params.where.forEach(p => { sqlBuilder.where(p.field, p.operator, p.value) })

    if (! Array.isArray(params.order)) {
      params.order = [params.order]
    }
    params.order.forEach(o => { sqlBuilder.orderByRaw(o) })

    const promises = await sqlBuilder.map(async row => Object.create(this).setData(row))

    return Promise.all(promises)
  }


  static async getInstance(ClassName, value, field = 'id') {
    let obj = new ClassName()
    let found = await obj.findByField(field, '=', value)
    return found ? obj : {}
  }
    

}