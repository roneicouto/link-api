const createError = require('http-errors')
const db = require('../utils/db')
const Cliente = require('./cliente')
const PlanoPag = require('./planopag')
const Produto = require('./produto')
const OpComercial = require('./opcomercial')
const SysConfig = require('./sysconfig')
const PreVenda = require('./prevenda')
const Usuario = require('./usuario')

const validacoes = {
  geral: [
    'cliente_tabela',
    'cliente_plano',
    'cliente_suspenso',
    'cliente_limite',
    'cliente_atraso',
    'cliente_acordos',
    'cliente_cheque_dev',
    'plano_usuario',
    'plano_tabela',
    'plano_acrescimo',
    'plano_desconto',
    'plano_entrada',
    'plano_valor',
    'opcom_desconto'
  ],
  itens: [
    'produto_promocao',
    'produto_plano_desconto',
    'produto_opcom_desconto',
    'produto_desconto'
  ]
}


module.exports = class AnalisePreVenda {
  constructor(idLoja, numero) {
    this.idLoja = idLoja
    this.numero = numero
    this.reset()
  }


  reset() {
    this.sucesso = false    
    this.pendencias = []
  }


  async validate(idUsuario, salvar = false) {

    let pendencia = (tipo, item = '') => this.pendencias.push({tipo, item})

    this.reset()

    let user = await Usuario.getInstance(idUsuario)
    if (! user.data) {
      throw new createError.NotFound('Usuário não encontrado!')
    }
    user = user.data

    let venda = await PreVenda.getInstance(this.idLoja, this.numero)
    if (! venda.data) {
      throw new createError.NotFound('Pré-venda não encontrada!')    
    }
    venda = venda.data
    if (! 'PI'.includes(venda.situacao)) {
      throw new createError.BadRequest('Situação da pré-venda inválida para validação!')
    }

    let config = await SysConfig.getConfig()

    let [cliente, planoPag, planoUser, opVenda] = await Promise.all([
      Cliente.getInstance(venda.id_cliente),
      PlanoPag.getInstance(venda.id_plano_pag),
      PlanoPag.getPermissoesUsuario(venda.id_plano_pag, user.id_nivel),
      OpComercial.getInstance(config.id_op_venda)
    ])

    if (! cliente.data) {
      throw new createError.NotFound('Cliente não encontrado!')
    }
    if (! planoPag.data) {
      throw new createError.NotFound('Plano de pagamento não encontrado!')
    }
    if (! opVenda.data) {
      throw new createError.NotFound('Operação comercial de venda não encontrada!')
    }
    cliente = cliente.data
    opVenda = opVenda.data

    let plano = planoPag.data    

    // validando o cliente

    if (cliente.tabelas.length > 0 && ! cliente.tabelas.includes(venda.id_tab_preco)) {
      pendencia('cliente_tabela')
    }
    if (cliente.planos.length > 0 && ! cliente.planos.includes(venda.id_plano_pag)) {
      pendencia('cliente_plano')
    }
    if ( /04|05/.test(plano.forma_pag) ) {
      let fin = cliente.financeiro

      if (! planoUser.cred_suspenso && cliente.sit_cred === 'S') {
        pendencia('cliente_suspenso')
      }
      if (! planoUser.limite_cred && cliente.limite_cred > 0 && prevenda.saldo_devedor > fin.limite_disp) {
        pendencia('cliente_limite')
      }
      limite = planoUser.dias_atraso || plano.dias_atraso || 0
      if (limite > 0 && fin.dias_atraso > limite) {
        pendencia('cliente_atraso')
      }
      if (! planoUser.acordos && fin.saldo_acordos > 0) {
        pendencia('cliente_acordos')
      }
      if (! planoUser.cheque_devol && fin.cheques_devol > 0) {
        pendencia('cliente_cheque_dev')
      }
    }

    // validando o plano de pageamento

    if (/^\d+$/.test(plano.id_nivel) && user.id_nivel > plano.id_nivel) {
      pendencia('plano_usuario')  
    }
    if (plano.tabelas.length > 0 && ! plano.tabelas.includes(venda.id_tab_preco)) {
      pendencia('plano_tabela')
    }
    let pAcres = venda.vl_acrescimo * 100 / venda.vl_itens
    let limite = plano.acrescimo_auto ? 0 : plano.perc_acrescimo
    if (limite > 0 && pAcres < limite) {
      pendencia('plano_acrescimo')
    }
    let pDesc = venda.vl_desconto * 100 / venda.vl_itens          
    limite = plano.desconto_auto ? 0 : planoUser.perc_desc_total || plano.perc_desc_total || 0
    if (limite > 0 && pDesc > limite) {
      pendencia('plano_desconto')
    }
    let pEntrada = venda.vl_entrada * 100 / venda.vl_total    
    limite = planoUser.perc_entrada || plano.perc_entrada || 0
    if (pEntrada > 0 && pEntrada < limite) {
      pendencia('plano_entrada')
    }
    limite = planoUser.valor_minimo || plano.valor_minimo || 0 
    if (limite > 0 && prevenda.vl_total < limite) {
      pendencia('plano_valor')
    }

    // validando a operação comercial

    if (opVenda.perc_desc_total > 0 && pDesc > opVenda.perc_desc_total) {
      pendencia('opcom_desconto')
    }

    // validando os itens da prevenda

    await Promise.all(venda.itens.map(async (item) => {
      let [produto, preco] = await Promise.all([        
        Produto.getInstance(item.id_produto, venda.id_loja),
        Produto.precoVenda(item.id_produto, venda.id_loja, venda.id_tab_preco)
      ])
      
      if (! planoPag.validateProduto(produto.data)) {
        pendencia('produto_plano', item.seq)
      }
      if (! plano.promocao && item.promocao) {
        pendencia('produto_promocao', item.seq)
      }
      let pDesc  = (1 - (item.vl_total / (item.quantidade * preco.preco_venda))) * 100      
      let limite = planoUser.perc_desc_item || plano.perc_desc_item || 0
      if (limite > 0 && pDesc > limite) {
        pendencia('produto_plano_desconto', item.seq)
      }
      if (opVenda.perc_desc_item > 0 && pDesc > opVenda.perc_desc_item) {
        pendencia('produto_opcom_desconto', item.seq)
      }
      if (produto.desc_maximo > 0 && pDesc > produto.desc_maximo) {
        pendencia('produto_desconto', item.seq)
      }
    }))

    this.sucesso = (this.pendencias.length === 0)

    if (salvar) {
      let client = await db.client()
      try {
        let promises = []

        await client.query('BEGIN')

        validacoes.geral.forEach(value => {
          if (this.pendencias.findIndex(p => p.tipo === value && ! p.item) < 0) {
            let params = [ 
              this.idLoja,
              this.numero,
              user.id,
              value
            ]
            let cmdSql = 'SELECT api_salvar_validacao_pre_venda('
            params.forEach((v,i) => cmdSql += (i > 0 ? ',' : '') + '$' + (++i))
            cmdSql += ') as done'
            promises.push(client.query(cmdSql, params))
          }
        })

        vendas.itens.forEach(item => {
          validacoes.itens.forEach(value => {
            if (this.pendencias.findIndex(p => p.tipo === value && p.item === item.seq) < 0) {
              let params = [ 
                this.idLoja,
                this.numero,
                user.id,
                item.seq,
                value
              ]
              let cmdSql = 'SELECT api_salvar_validacao_pre_venda_item('
              params.forEach((v,i) => cmdSql += (i > 0 ? ',' : '') + '$' + (++i))
              cmdSql += ') as done'
              promises.push(client.query(cmdSql, params))
            }
          })
        })

        await Promise.all(promises)

        await client.query('SELECT api_validar_pre_venda($1, $2)', [this.idLoja, this.numero])
        await client.query('COMMIT')


      } catch (error) {

        await client.query('ROLLBACK')
        throw error
          
      } finally {

        client.release()

      }
    }

    return this

  }


  static getInstance(idLoja, numero, idUsuario) {
    let analise = new AnalisePreVenda(idLoja, numero)
    return analise.validate(idUsuario)
  }

}