const utils = require('../utils/utils')
const Cliente = require('./cliente')
const PlanoPag = require('./planopag')
const Produto = require('./produto')
const OpComercial = require('./opcomercial')
const SysConfig = require('./sysconfig')
const PreVenda = require('./prevenda')

module.exports = class SituacaoPreVenda {
  constructor(loja, numero) {
    this.loja = loja
    this.numero = numero
    this.data = []
    this.irregular = false
  }

  async validate(idNivel) {

    let pendencia = (tipo, valor = '', item = '') => {
      this.data.push( {item, tipo, valor} )
    }

    let config   = await SysConfig.getConfig()
    let prevenda = await PreVenda.getPreVenda(this.loja, this.numero)    
    let cliente  = await utils.newObjectById(Cliente, prevenda.data.id_cliente)
    let plano    = await utils.newObjectById(PlanoPag, prevenda.data.id_plano)
    let user     = await plano.getPermissoesUsuario(idNivel)    
    let opVenda  = await utils.newObjectById(OpComercial, config.id_op_venda)

    let pDesc    = prevenda.vl_desconto  * 100 / prevenda.vl_itens      
    let pAcres   = prevenda.vl_acrescimo * 100 / prevenda.vl_itens
    let pEntrada = prevenda.vl_entrada   * 100 / prevenda.vl_total


    let validateProduto = plano.validateProduto

    this.data = []
    cliente   = cliente.data
    opVenda   = opVenda.data
    plano     = plano.data

    // validando o cliente

    if (cliente.tabelas.length > 0 && ! cliente.tabelas.includes(prevenda.id_tab_preco)) 
      pendencia('cliente_tabela')

    if (cliente.planos.length > 0 && ! cliente.planos.includes(prevenda.id_plano_pag)) 
      pendencia('cliente_plano')

    // validando o plano de pagamento

    if (/\d/.test(plano.id_nivel) && idNivel > plano.id_nivel) 
      pendencia('plano_usuario')

    if (plano.tabelas.length > 0 && ! plano.tabelas.includes(prevenda.id_tab_preco)) 
      pendencia('plano_tabela')

    limite = plano.acrescimo_auto ? 0 : plano.perc_acrescimo
    if (limite > 0 && pAcres < limite) 
      pendencia('plano_acrescimo')
    
    limite = plano.desconto_auto ? 0 : user.perc_desc_total || plano.perc_desc_total || 0
    if (limite > 0 && pDesc > limite) 
      pendencia('plano_desconto')
    
    limite = user.valor_minimo || plano.valor_minimo || 0 
    if (limite > 0 && prevenda.vl_total < limite) 
      pendencia('plano_valor')

    limite = user.perc_entrada || plano.perc_entrada || 0
    if (pEntrada > 0 && pEntrada < limite) 
      pendencia('plano_entrada')

    if ( /04|05/.test(plano.forma_pag) ) {
      let fin = cliente.financeiro

      if (! user.cred_suspenso && cliente.sit_cred === 'S') 
        pendencia('cliente_suspenso')

      if (! user.limite_cred && cliente.limite_cred > 0 && prevenda.saldo_devedor > fin.limite_disp)
        pendencia('cliente_limite')

      limite = user.dias_atraso || plano.dias_atraso || 0
      if (limite > 0 && fin.dias_atraso > limite)
        pendencia('cliente_atraso')

      if ( !user.acordos && fin.saldo_acordos > 0)
        pendencia('cliente_acordos')

      if (!user.cheque_devol && fin.cheques_devol > 0)
        pendencia('cliente_cheque_dev')

    }  

    // validando operação comercial

    if (opVenda.perc_desc_total > 0 && pDesc > opVenda.perc_desc_total) 
      pendencia('opcom_desconto')
    
    // validando os itens da pre-venda

    for (const item of prevenda.itens) {
      let undf
      let [produto, preco] = await Promise.all([
        utils.newObjectById(Produto, item.id_produto),
        Produto.precoTabela(item.id_produto, prevenda.id_loja, prevenda.id_tabela_preco)
      ])
      let pDesc = (1 - (item.vl_total / (item.quantidade * preco))) * 100      

      if (! await validateProduto(produto)) 
        pendencia('produto_plano', undf, item.seq)

      if (! plano.promocao && item.promocao) 
        pendencia('produto_promocao', undf, item.seq)
      
      limite = user.perc_desc_item || plano.perc_desc_item || 0
      if (limite > 0 && pDesc > limite) 
        pendencia('produto_plano_desconto',undf, item.seq)

      if (opVenda.perc_desc_item > 0 && pDesc > opVenda.perc_desc_item) 
        pendencia('produto_opcom_desconto', undf, item.seq)

      if (produto.desc_maximo > 0 && pDesc > produto.desc_maximo) 
        pendencia('produto_desconto', undf, item.seq)
    }

    this.irregular = (this.data.length > 0)
    return ! this.irregular

  }

  static async validatePreVenda(loja, numero, idNivelUser) {
    let sitPreVenda = new SituacaoPreVenda(loja, numero)
    return sitPreVenda.validate(idNivelUser)
  }

}
