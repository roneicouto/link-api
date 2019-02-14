const createError = require('http-errors')
const Cliente = require('./cliente')
const PlanoPag = require('./planopag')
const Produto = require('./produto')
const OpComercial = require('./opcomercial')
const SysConfig = require('./sysconfig')
const PreVenda = require('./prevenda')

module.exports = class SituacaoPreVenda {
  constructor(idLoja, numero) {
    this.idLoja = idLoja
    this.numero = numero
    this.data   = []
    this.irregular = false
  }

  async validate(idNivel) {

    let pendencia = (tipo, valor = '', item = '') => {
      this.data.push( {item, tipo, valor} )
    }

    let venda = await PreVenda.getInstance(this.idLoja, this.numero)
    if (! venda.data) {
      throw new createError.NotFound('Pré-venda não encontrada!')    
    }
    venda = venda.data
    if (! 'PI'.includes(venda.situacao)) {
      throw new createError.BadRequest('Situação da pré-venda inválida para validação!')
    }

    let config = await SysConfig.getConfig()

    let [cliente, planoPag, user, opVenda] = await Promise.all([
      Cliente.getInstance(venda.id_cliente),
      PlanoPag.getInstance(venda.id_plano_pag),
      PlanoPag.getPermissoesUsuario(venda.id_plano_pag, idNivel),
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

      if (! user.cred_suspenso && cliente.sit_cred === 'S') {
        pendencia('cliente_suspenso')
      }
      if (! user.limite_cred && cliente.limite_cred > 0 && prevenda.saldo_devedor > fin.limite_disp) {
        pendencia('cliente_limite')
      }
      limite = user.dias_atraso || plano.dias_atraso || 0
      if (limite > 0 && fin.dias_atraso > limite) {
        pendencia('cliente_atraso')
      }
      if (! user.acordos && fin.saldo_acordos > 0) {
        pendencia('cliente_acordos')
      }
      if (! user.cheque_devol && fin.cheques_devol > 0) {
        pendencia('cliente_cheque_dev')
      }
    }

    // validando o plano de pageamento

    if (/^\d+$/.test(plano.id_nivel) && idNivel > plano.id_nivel) {
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
    limite = plano.desconto_auto ? 0 : user.perc_desc_total || plano.perc_desc_total || 0
    if (limite > 0 && pDesc > limite) {
      pendencia('plano_desconto')
    }
    let pEntrada = venda.vl_entrada * 100 / venda.vl_total    
    limite = user.perc_entrada || plano.perc_entrada || 0
    if (pEntrada > 0 && pEntrada < limite) {
      pendencia('plano_entrada')
    }
    limite = user.valor_minimo || plano.valor_minimo || 0 
    if (limite > 0 && prevenda.vl_total < limite) {
      pendencia('plano_valor')
    }

    // validando a operação comercial

    if (opVenda.perc_desc_total > 0 && pDesc > opVenda.perc_desc_total) {
      pendencia('opcom_desconto')
    }

    // validando os itens da prevenda

    await Promise.all(venda.itens.map(async (item) => {
      let undf
      let [produto, preco] = await Promise.all([        
        Produto.getInstance(item.id_produto, venda.id_loja),
        Produto.precoVenda(item.id_produto, venda.id_loja, venda.id_tab_preco)
      ])
      
      if (! planoPag.validateProduto(produto.data)) {
        pendencia('produto_plano', undf, item.seq)
      }
      if (! plano.promocao && item.promocao) {
        pendencia('produto_promocao', undf, item.seq)
      }
      let pDesc  = (1 - (item.vl_total / (item.quantidade * preco.preco_venda))) * 100      
      let limite = user.perc_desc_item || plano.perc_desc_item || 0
      if (limite > 0 && pDesc > limite) {
        pendencia('produto_plano_desconto',undf, item.seq)
      }
      if (opVenda.perc_desc_item > 0 && pDesc > opVenda.perc_desc_item) {
        pendencia('produto_opcom_desconto', undf, item.seq)
      }
      if (produto.desc_maximo > 0 && pDesc > produto.desc_maximo) {
        pendencia('produto_desconto', undf, item.seq)
      }
    }))

    this.irregular = (this.data.length > 0)            
    return this
  }


  static async validatePreVenda(loja, numero, idNivelUser) {
    let sitpv = new SituacaoPreVenda(loja, numero)
    await sitpv.validate(idNivelUser)
    return {pendencias: sitpv.data.length, list: sitpv.data}
  }

}
