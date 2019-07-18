const knex = require('../knex/knexload')

module.exports = class SysConfig {

  static async getConfig() {
    const config = new SysConfig()
    const rows = await knex.from('vs_api_config')

    if (rows.length > 0) {
      Object.assign(config, rows[0])
    }
    return config
  }

}
