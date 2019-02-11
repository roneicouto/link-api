const createError = require('http-errors')
const db = require('../utils/db')
const SqlPage = require('../classes/sql-page')

module.exports = class Cadastro {

  constructor(table, fieldID = 'id') {
    this.sql = {
      table,
      fieldID,
      where: '',
      params: []
    }
    this.data = {}
  }


  findById(id) {
    return this.findByField(this.sql.fieldID, '=', id)
  }


  findByField(field, operator, text) {
    this.sql.where  = field + ' ' + operator + ' $1'
    this.sql.params = [text]
    return this.executeSql()
  }


  executeSql() {
    return new Promise((resolve, reject) => {
      let cmdSql = 'SELECT * FROM ' + this.sql.table + ' WHERE ' + this.sql.where + ' LIMIT 1'
      this.data = {}
      db.query(cmdSql, this.sql.params)
        .then(({ rows }) => {
          if (! rows.length) {
            resolve(false)
          } else {
            this.setData(rows[0])
              .then(row => {
                this.data = row
                resolve(true)
              })
              .catch(error => reject(error))
          }
        })
       .catch(error => reject(error))
    })
  }


  setData(row) {
    return Promise.resolve(row)
  }


  getAll(params, page = 0) {
    if (page < 1) {
      throw new createError.BadRequest('numero da página não informado!')
    }

    let promiseRow = (row) => {
      return new Promise((resolve, reject) => {
        let oCad = Object.create(this)
        oCad.setData(row)
          .then(row => {
            oCad.data = row
            resolve(oCad)
          })
          .catch(error => reject(error))
      })
    }

    let cmdSql = 'SELECT * FROM ' + this.sql.table
    let values = []
    let orders = []

    params = Array.isArray(params) ? params : [params]
    params.forEach(p => {
      if (! p.field) {
        throw new createError.BadRequest('O atributo field não foi informado!')
      }
      if (p.value) {
        values.push(p.value)
        cmdSql += ' ' + (values.length > 1 ? 'AND' : 'WHERE') + ' ' + p.field + ' ~ $' + values.length        
      }
      if (p.order) {
        orders.push(p.field + (p.order < 0 ? ' DESC' : ''))
      }
    })
    
    orders.forEach((o, i) => cmdSql += (i > 0 ? ',' : ' ORDER BY') + ' ' + o)

    return new Promise((resolve, reject) => {
      let promise = page > 0 ? new SqlPage(cmdSql, values).getPage(page)
                             : db.query(cmdSql, values)
      promise
        .then(resp => resp.rows.map(row => promiseRow(row)))
        .then(promises => Promise.all(promises))
        .then(lista => resolve(lista))
        .catch(error => reject(error))
    })   
  }


  static getInstance(ClassName, value, field = 'id') {
    return new Promise((resolve, reject) => {
      let obj = new ClassName()
      obj.findByField(field, '=', value)
        .then(found => resolve(found ? obj : {}))
        .catch(error => reject(error))
    })
  }
    

}