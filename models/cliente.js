const db = require('../utils/db')
const utils = require('../utils/utils')
const Cadastro = require('../classes/cadastro')
const Municipio = require('../models/municipio')
const UF = require('../models/uf')
const Loja = require('../models/loja')

module.exports = class Cliente extends Cadastro {

  constructor() {
    super('vs_api_clientes')
  }


  async create() {
    let data = this.data, msg = []
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
      else {
        let cliente = new Cliente()
        let found = await cliente.find(data.cpf_cnpj)
        if (found)
          msg.push((data.pessoa==='J' ? 'CNPJ' : 'CPF') + ' já cadastrado. Cliente ' + cliente.data.id + ' - ' + cliente.data.nome)
      }
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

    let params = [
        data.nome, 
        data.pessoa, 
        data.nome_fantasia || '',
        data.apelido || '',
        data.cpf_cnpj, 
        data.insc_estadual,
        data.endereco, 
        data.numero_end,
        data.bairro || '', 
        data.cidade, 
        data.id_municipio, 
        data.uf, 
        data.cep,
        data.id_loja,
        data.telefone || '',
        data.celular || '',
        data.email || '',
        data.sexo || '',
        data.data_nasc || null,
        data.consumidor===undefined ? true : data.consumidor,
        data.crt || (data.pessoa==='J' ? '3' : ''),
        data.id_usuario
    ]

    let cmdSql = 'SELECT api_novo_cliente('
    
    params.forEach((v,i) => cmdSql += (i > 0 ? ',' : '') + '$' + (++i))
    cmdSql += ') as id'

    let {rows} = await db.query(cmdSql, params)

    this.data.id = rows[0].id

    return {sucesso: true, id_cliente: this.data.id}

  }



  find(id) {
    return this.findByField(id.length > 10 ? 'cpf_cnpj' : 'id', '=', id)
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
