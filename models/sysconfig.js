const db = require('../utils/db')

module.exports = class SysConfig {

  static async getConfig() {
    let config = new SysConfig()
    let result = await db.query('SELECT * FROM vs_api_config')
    if (result.rows.length > 0) {
      Object.assign(config, result.rows[0])
    }
    return config
  }

}
