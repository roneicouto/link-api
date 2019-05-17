const utils = require('../utils/utils')
const Cadastro = require('../classes/cadastro')
const Municipio = require('../models/municipio')
const UF = require('../models/uf')
const Loja = require('../models/loja')
const knex = require('../knex/knexload')

module.exports = class Cliente extends Cadastro {

  constructor() {
    super('vs_api_clientes')
  }


  create() {
    return this.save(true)
  }


  update() {
    return this.save(false)
  }

  
  async save(novo) {

    let data = this.data, msg = []

    if (! novo && ! /\d/.test(data.id))
      msg.push('ID do cliente inválido ou não informado!')
    if (! data.id_loja || ! await Loja.exists(data.id_loja))
      msg.push('Loja não informada ou não existe!')
    if (! data.nome || data.nome.replace(/[^[:alpha:]]/g, '').length < 10)
      msg.push('Nome não informado ou muito curto!')
    if (! data.pessoa || ! /P|F/.test(data.pessoa))
      msg.push('Tipo de pessoa inválido ou não informado!')
    else {
      if (data.pessoa==="J" && ! utils.cnpjValido(data.cpf_cnpj))
        msg.push('CNPJ inválido!')
      else if (data.pessoa==='J' 
               && data.insc_estadual 
               && /\d/.test(data.insc_estadual)
               && ! UF.inscricaoEstadualValida(data.insc_estadual, data.uf))
        msg.push('Inscrição Estadual inválida!')
      else if (data.pessoa==="F" && ! utils.cpfValido(data.cpf_cnpj))
        msg.push('CPF inválido')      
    }
    if (! data.endereco)
      msg.push('Endereço não informado')
    if (! parseInt(data.numero_end))
      msg.push('Número do endereço não informado')
    if (! data.cidade)
      msg.push('Nome da cidade não informado')
    if (! await Municipio.exists(data.id_municipio))
      msg.push('Código do municipio inválido ou não informado')
    if (! await UF.exists(data.uf))
      msg.push('UF inválida ou não informada')
    if (! data.cep || ! /^\d{8}$/.test(data.cep))
      msg.push('CEP inválido ou não informado')
    if (! data.telefone && ! data.celular)
      msg.push('Telefone ou celular não informado')
    if (data.sexo && ! /M|F/.test(data.sexo))
      msg.push('Sexo deve ser M (Masculino) ou F (Feminino)')
    
    if (msg.length > 0) 
      return {sucesso: false, erros: msg}

    const { rows } = await this.knex.raw('SELECT api_salvar_cliente( ? ) as id', JSON.stringify(data))

    return { sucesso: true, id_cliente: rows[0].id }

  }


  find(id) {
    return this.findByField(id.length > 10 ? 'cpf_cnpj' : 'id', '=', id)
  }


  findByNome(nome, page, rows) {
    return this.getAll({
      page,
      rows,
      where: [{ field: 'nome', operator: '~', value: '^' + nome }],
      order: ['nome']
    })
  }


  findByNomeFantasia(nome, page, rows) {
    return this.getAll({
      page,
      rows,
      where: [{ field: 'nome_fantasia', operator: '~', value: '^' + nome }],
      order: ['nome_fantasia']
    })
  }



  getAll(params = {}) {

    params.page = params.page || 1
    params.rows = params.rows || process.env.DB_PAGE_ROWS

    return super.getAll(params)

  }


  
  async setData(row) {

    const results = await Promise.all([
      this.knex('vs_api_clientes_planos_pag').where('id_cliente', row.id),
      this.knex('vs_api_clientes_tab_precos').where('id_cliente', row.id),
      Cliente.getResumoFinanceiro(row)
    ])

    row.planos  = []
    row.tabelas = []

    results[0].forEach(r => row.planos.push(r.id_plano_pag))
    results[1].forEach(r => row.tabelas.push(r.id_tab_preco))        
    row.financeiro = results[2]

    return row

  }


  static async delete(id) {
    const { rows } = await knex.raw('SELECT api_excluir_cliente( ? ) as sucesso', id)
    return {sucesso: rows[0].sucesso}
  }


  static async getResumoFinanceiro(cliente) {

    const results = await Promise.all([
      knex('vs_api_contas_receber').where({ id_cliente: cliente.id }),
      knex('vs_api_cheques'       ).where({ id_cliente: cliente.id, situacao: '2' })
    ])

    let dias_atraso = 0
    let saldo_devedor = 0
    let saldo_acordos = 0    
    let debito_atraso = 0
    let cheques_devol = 0
    let limite_disp = 0

    results[0].forEach(r => {
      dias_atraso   = Math.max(dias_atraso, r.dias)
      saldo_devedor += r.saldo
      saldo_acordos += r.acordo ? r.saldo : 0      
      debito_atraso += r.dias > 0 ? r.saldo : 0
    })

    results[1].forEach(r => cheques_devol += r.valor)          

    saldo_devedor = utils.roundVal(saldo_devedor)
    saldo_acordos = utils.roundVal(saldo_acordos)
    debito_atraso = utils.roundVal(debito_atraso)
    cheques_devol = utils.roundVal(cheques_devol)
    limite_disp   = utils.roundVal(Math.max(0, cliente.limite_cred - saldo_devedor))

    return {
      dias_atraso,
      saldo_devedor,
      saldo_acordos,
      debito_atraso,
      cheques_devol,
      limite_disp
    }
  }

  static getInstance(idCliente) {
    return Cadastro.getInstance(Cliente, idCliente)
  }

}
