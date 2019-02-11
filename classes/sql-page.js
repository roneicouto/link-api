const db = require('../utils/db')

module.exports = class SqlPage {
  
  constructor(cmdSql, params = [], rowsPage = 10) {
    this.params = [...params, rowsPage, 0]
    this.rowsPage = rowsPage
    this.cmdSql = cmdSql + ' LIMIT $' + (this.params.length - 1) + ' OFFSET $' + this.params.length
  }

  getPage(page = 1) {
    this.params[this.params.length-1] = this.rowsPage * ( page - 1)
    return db.query(this.cmdSql, this.params)
  }

}