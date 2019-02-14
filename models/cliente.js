const db = require('../utils/db')
const utils = require('../utils/utils')
const Cadastro = require('../classes/cadastro')
const Municipio = require('../models/municipio')
const UF = require('../models/uf')

module.exports = class Cliente extends Cadastro {

  constructor() {
    super('vs_api_clientes')
  }


  async create() {
    let data = this.data, msg = []
    if (! data.nome)
      msg.push('Nome não informado')
    if (! data.pessoa || ! /P|F/.test(data.pessoa))
      msg.push('Tipo de pessoa não informado ou inválido')
    else {
      if (data.pessoa==="J" && ! utils.cnpjValido(data.cpf_cnpj))
        msg.push('CNPJ inválido')
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
      msg.push('Código do municipio inválido')
    if (! await UF.exists(data.uf))
      msg.push('UF inválida')
    if (! data.cep || ! /^\d{8}$/.test(data.cep))
      msg.push('CEP inválido')

    if (msg.length > 0) 
      return {sucesso: false, erros: msg}

    return {sucesso: true, cliente: this.data}

  }



  find(id) {
    return this.findByField(id.length > 10 ? 'cnpj_cpf' : 'id', '=', id)
  }


  findByNome(nome, page) {
    return this.getAll({
      field: 'nome',
      value: '^' + nome
    }, page)
  }


  findByNomeFantasia(nome, page) {
    return this.getAll({
      field: 'nome_fantasia',
      value: '^' + nome
    }, page)
  }


  setData(row) {
    return new Promise((resolve, reject) =>{

      let promises = [
        db.query('SELECT * FROM vs_api_clientes_planos_pag WHERE id_cliente = $1', [row.id]),
        db.query('SELECT * FROM vs_api_clientes_tab_precos WHERE id_cliente = $1', [row.id]),
        Cliente.getResumoFinanceiro(row)
      ]

      row.planos  = []
      row.tabelas = []
  
      Promise.all(promises)
        .then(results => {
          results[0].rows.forEach(r => row.planos.push(r.id_plano_pag))
          results[1].rows.forEach(r => row.tabelas.push(r.id_tab_preco))        
          row.financeiro = results[2]
          resolve(row)
        })
        .catch(error => reject(error))

    })
  }


  static getResumoFinanceiro(cliente) {
    return new Promise((resolve, reject) => {

      let promises = [
        db.query('SELECT * FROM vs_api_contas_receber WHERE id_cliente = $1', [cliente.id]),
        db.query('SELECT * FROM vs_api_cheques WHERE id_cliente = $1 and situacao = $2', [cliente.id, '2'])        
      ]

      Promise.all(promises)
        .then(results => {

          let dias_atraso = 0
          let saldo_devedor = 0
          let saldo_acordos = 0    
          let debito_atraso = 0
          let cheques_devol = 0
          let limite_disp = 0
    
          results[0].rows.forEach(r => {
            dias_atraso   = Math.max(dias_atraso, r.dias)
            saldo_devedor += r.saldo
            saldo_acordos += r.acordo ? r.saldo : 0      
            debito_atraso += r.dias > 0 ? r.saldo : 0
          })

          results[1].rows.forEach(r => cheques_devol += r.valor)          

          saldo_devedor = utils.roundVal(saldo_devedor)
          saldo_acordos = utils.roundVal(saldo_acordos)
          debito_atraso = utils.roundVal(debito_atraso)
          cheques_devol = utils.roundVal(cheques_devol)
          limite_disp   = utils.roundVal(Math.max(0, cliente.limite_cred - saldo_devedor))

          resolve({
            dias_atraso,
            saldo_devedor,
            saldo_acordos,
            debito_atraso,
            cheques_devol,
            limite_disp
          })

        })
        .catch(error => reject(error))
    })
  }

  static getInstance(idCliente) {
    return Cadastro.getInstance(Cliente, idCliente)
  }

}
