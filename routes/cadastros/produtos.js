const createError = require('http-errors')
const Produto = require('../../models/produto')

module.exports = (app) => {

  const path = app.get('path-api') + '/produtos'
  
  
  app.get(path + '/:id?', (req, res, next) => {

    let produto, promise

    if ( ! (req.login && req.login.idLoja) ) 
      throw new createError.BadRequest('Loja não informada!') 
    
    produto = new Produto()
    produto.idLoja = req.login.idLoja

    promise = req.params.id    ? produto.findById(req.params.id) : 
              req.query.codbar ? produto.findByCodigoBarras(req.query.codbar) :
              req.query.ref    ? produto.findByReferencia(req.query.ref):
                                 ''
    if (promise) {
      promise
        .then(found => {
          if (!found) {
            throw new createError.NotFound('Produto não encontrado!')
          }

          res.status(200).json(produto.data)
        })
        .catch(error =>next(error))
      return
    } 

    if (req.query.descr) {

      promise = produto.findByDescricao(req.query.descr, req.query.page, req.query.rows) 

    } else if (req.query.parcial) {

      promise = produto.findByDescricaoParcial(req.query.parcial, req.query.page, req.query.rows) 

    } else {

      promise = produto.getAll({
        page: req.query.page,
        rows: req.query.rows,
        order: 'descricao'
      })

    }
      
    promise
      .then(lista => {
        if (!lista.length) {
          throw new createError.NotFound('Produtos não encontrados!')
        }
        res.status(200).json(lista)
      })
      .catch(error =>next(error))

  })



  app.get(path + '/:idprod/estoques/:idloja?', (req, res, next) => {

    Produto.estoqueLoja(req.params.idprod, req.params.idloja)
      .then(rows => res.status(200).json(rows))
      .catch(error => next(error))
  })



  app.get(path + '/:idprod/estoques/:idloja/grades/:posgrade?', (req, res, next) => {

    Produto.estoqueLojaGrade(req.params.idprod, req.params.idloja, req.params.posgrade)
      .then(rows => res.status(200).json(rows))
      .catch(error => next(error))
  })



  app.get(path + '/:idprod/precos/:idtab?', (req, res, next) => {

    if ( ! (req.login && req.login.idLoja) ) 
      throw new createError.BadRequest('Loja não informada!')

    Produto.precoVenda(req.params.idprod, req.login.idLoja, req.params.idtab)
      .then(rows => res.status(200).json(rows))
      .catch(error => next(error))

  })



  app.get(path + '/:idprod/precos/:idtab/planos/:idplano?', (req, res, next) => {

    if ( ! (req.login && req.login.idLoja) ) 
      throw new createError.BadRequest('Loja não informada!') 

    Produto.precoVendaPlano(req.params.idprod, req.login.idLoja, req.params.idtab, req.params.idplano)
      .then(rows => res.status(200).json(rows))
      .catch(error => next(error))

  })

}



/**
 * @api {get} /produtos/:idprod/precos/:idtab/planos/:idplano  Consultar os preços de um produto por plano de pagamento
 * @apiVersion 1.0.0
 * @apiName getProdutosTabPrecosPlanosPag
 * @apiGroup Produtos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} idprod     ID (código) do produto.
 * @apiParam {String} idtab      ID (código) da tabela de preço. 
 * @apiParam {String} [idplano]  ID (código) do plano de pagamento. Quando não informado, a resposta será um array contendo os preços de todos os planos de pagamento.
 * 
 * @apiSuccess {String} id_plano_pag    ID do plano de pagamento.
 * @apiSuccess {String} nome_plano_pag  Nome do plano de pagamento.
 * @apiSuccess {String} form_pag        Forma de pagamento gerado pelo plano.
 * @apiSuccess {Number} preco_venda     Preço venda do produto no plano.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id_plano_pag": "005",
 *      "nome_plano_pag": "5x COM ENTRADA",
 *      "forma_pag": "03",
 *      "preco_venda": 885,25
  *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */



/**
 * @api {get} /produtos/:idprod/precos/:idtab  Consultar as tabelas de preços de um produto
 * @apiVersion 1.0.0
 * @apiName getProdutosTabPrecos
 * @apiGroup Produtos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} idprod     ID (código) do produto.
 * @apiParam {String} [idtab]    ID (código) da tabela de preço. Quando não informado, a resposta será um array contendo os dados de todas as tabelas de preços do produto.
 * 
 * @apiSuccess {String} id_tab_preco    ID da tabela de preços.
 * @apiSuccess {String} nome_tab_preco  Nome da tabela de preços.
 * @apiSuccess {Number} preco_venda     Preço de venda do produto.
 * @apiSuccess {Number} preco_promocao  Preço de promoção do produto.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id_tab_preco": "02",
 *      "nome_tab_preco": "VENDA NO ATACADO",
 *      "preco_venda": 100,
 *      "preco_promocao": 92.55,
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


/**
 * @api {get} /produtos/:idprod/estoques/:idloja/grades/:posgrade  Consultar saldos de estoque de grades nas lojas
 * @apiVersion 1.0.0
 * @apiName getProdutosEstoquesGrades
 * @apiGroup Produtos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} idprod     ID (código) do produto.
 * @apiParam {String} idloja     ID (código) da loja. 
 * @apiParam {String} [posgrade] Posição de linha e coluna da grade no formato 9999, sendo os 2 primeiros digitos para posição da linha e os dois restantes para posição da coluna. 
 *                               Se este parâmetro não for informado, a requisição retornará um array contendo os estoques de todas as posições da grade do produto.
 * 
 * @apiSuccess {String} pos_grade       Posição da grade no formato 9999.
 * @apiSuccess {String} descr_linha     Descrição da linha da grade.
 * @apiSuccess {String} descr_coluna    Descrição da coluna da grade, se houver.
 * @apiSuccess {Number} saldo_loja      Saldo de estoque disponivel para venda.
 * @apiSuccess {Number} saldo_dep       Saldo de estoque disponível no depósito.
 * @apiSuccess {Number} saldo_loja_frc  Saldo de estoque da loja em unidade de frações.
 * @apiSuccess {Number} saldo_dep_frc   Saldo de estoque do depósito em unidades de frações.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "pos_grade": "0102",
 *      "descr_linha": "AMARELO",
 *      "descr_coluna": "MEDIO",
 *      "saldo_loja": 100,
 *      "saldo_dep": 50,
 *      "saldo_loja_frc": 1000,
 *      "saldo_dep_frc": 500 
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */



/**
 * @api {get} /produtos/:idprod/estoques/:idloja  Consultar saldo de estoque das lojas
 * @apiVersion 1.0.0
 * @apiName getProdutosEstoques
 * @apiGroup Produtos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} idprod     ID (código) do produto.
 * @apiParam {String} [idloja]   ID (código) da loja. Se não informado, a resposta da requisição será um array com os saldos de estoques de todas as lojas.
 *
 * @apiSuccess {String} id_loja         ID da loja.
 * @apiSuccess {String} nome_loja       Nome da loja.
 * @apiSuccess {Number} saldo_loja      Saldo de estoque disponivel para venda.
 * @apiSuccess {Number} saldo_dep       Saldo de estoque disponível no depósito.
 * @apiSuccess {Number} saldo_loja_frc  Saldo de estoque da loja em unidade de frações.
 * @apiSuccess {Number} saldo_dep_frc   Saldo de estoque do depósito em unidades de frações.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id_loja": "01",
 *      "nome_loja": "PARAISO DAS CONSTRUÇÕES",
 *      "saldo_loja": 100,
 *      "saldo_dep": 50,
 *      "saldo_loja_frc": 1000,
 *      "saldo_dep_frc": 500 
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


/**
 * @api {get} /produtos/:id  Consultar produtos
 * @apiVersion 1.0.0
 * @apiName getProdutos
 * @apiGroup Produtos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]          ID (código) do produto.
 * @apiParam {String} [codbar]      Código de barras do produto.
 * @apiParam {String} [ref]         Referência do produto.
 * @apiParam {String} [descr]       Descrição do produto. A resposta será um array de produtos.
 * @apiParam {String} [parcial]     Descrição parcial do produto. A resposta será um array de produtos.
 * @apiParam {Number} [page]        Número da página para requisições que retornam um array de produtos.
 *
 * @apiSuccess {String}     id              ID (código) do produto.
 * @apiSuccess {String}     descricao       Descrição do produto.
 * @apiSuccess {String}     compl_descr     Complemento da descrição do produto.
 * @apiSuccess {String}     especie         Especie (P-Produto S-Serviço).
 * @apiSuccess {String}     tipo            Tipo do produto (Q-Quantidade ou P-Pesável).
 * @apiSuccess {String}     status          Status do produto para venda (A-Ativo ou I-Inativo).
 * @apiSuccess {String}     referencia      Código de referência do fornecedor do produto.
 * @apiSuccess {String}     cod_barras      Código de barras do produto.
 * @apiSuccess {String}     cod_integ       Código de integração do produto com outros aplicativos.
 * @apiSuccess {String}     marca           Marca do produto.
 * @apiSuccess {String}     fabricante      Fabricante do produto.
 * @apiSuccess {String}     classificacao   Grupo e subgrupo do produto.
 * @apiSuccess {String}     familia         ID da familia do produto.
 * @apiSuccess {String}     quant_emb       Quantidade do produto na embalagem de venda.
 * @apiSuccess {Boolean}    emb_fechada     Indica se o produto é vendido somente com embalagem fechada.
 * @apiSuccess {String}     unidade         Unidade de venda do produto.
 * @apiSuccess {String}     und_fracao      Unidade de venda da fração do produto.
 * @apiSuccess {Boolean}    venda_fracao    Indica se o produto pode ser vendido em unidades de fração.
 * @apiSuccess {Number}     quant_fracoes   Quantidade de unidades de frações contidas na unidade de venda do produto.
 * @apiSuccess {Number}     peso_liquido    Peso líquido do produto.
 * @apiSuccess {Number}     peso_bruto      Peso bruto do produto.
 * @apiSuccess {Number}     desc_maximo     Percentual máximo de desconto no preço de venda do produto.
 * @apiSuccess {String}     tabela_trib     ID da tabela de tributação do produto.
 * @apiSuccess {String}     id_loja         ID da loja ou filial.
 * @apiSuccess {String}     nome_loja       Nome da loja ou filial.
 * @apiSuccess {Number}     preco_venda     Preço de venda da tabela padrão do produto na loja.
 * @apiSuccess {Number}     preco_promocao  Preço de promoção do produto na tabela padrão da loja.
 * @apiSuccess {Number}     saldo_loja      Saldo de estoque disponivel para venda.
 * @apiSuccess {Number}     saldo_dep       Saldo de estoque disponivel no depósito.
 * @apiSuccess {Number}     saldo_loja_frc  Saldo de estoque em frações disponivel na loja.
 * @apiSuccess {Number}     saldo_dep_frc   Saldo de estoque em frações disponível no depósito.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 * {
 *     "id": "00001",
 *     "descricao": "LEITE ITAMBE PLUS CXA C/20 UND",
 *     "compl_descr": "",
 *     "especie": "P",
 *     "tipo": "Q",
 *     "status": "A",
 *     "referencia": "ABC-DEF-GHI-JKLM-NOP",
 *     "cod_barras": "9788537909294",
 *     "cod_integ": "1905",
 *     "marca": "ITAMBE",
 *     "fabricante": "ITAMBE",
 *     "classificacao": "04001",
 *     "familia": "003",
 *     "quant_emb": 10,
 *     "emb_fechada": false,
 *     "unidade": "CXA",
 *     "und_fracao": "PCT",
 *     "venda_fracao": false,
 *     "quant_fracoes": 10,
 *     "peso_liquido": 2.10,
 *     "peso_bruto": 2.20,
 *     "desc_maximo": 4.65,
 *     "tabela_trib": "01",
 *     "id_loja": "00",
 *     "nome_loja": "MATRIZ",
 *     "preco_venda": 152.25,
 *     "preco_promocao": 0,
 *     "saldo_loja": 262,
 *     "saldo_dep": 35,
 *     "saldo_loja_frc": 262,
 *     "saldo_dep_frc": 35
 * }
 *
 * @apiUse ErroRegistroNaoEncontrado
*/



/**
 * @api {get} /produtos/grupos/:id  Consultar grupos
 * @apiVersion 1.0.0
 * @apiName GetProdutosGrupos
 * @apiGroup Produtos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código) do grupo de produtos. Quando não informado, a requisição retornará um array de grupos.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id            ID (código) do grupo de produtos.
 * @apiSuccess {String}   nome_grupo    Nome do grupo.
 * @apiSuccess {String}   nome_subgrupo Nome do subgrupo.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {
 *      "id": "01001",
 *      "nome_grupo": "MATERIAIS ELETRICOS",
 *      "nome_subgrupo": "LUMINARIAS"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /produtos/unidades/:id  Consultar unidades
 * @apiVersion 1.0.0
 * @apiName GetProdutosUnidades
 * @apiGroup Produtos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID (código ou sigla) da unidade. Quando não informado, a requisição retornará um array de unidades.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id            ID (código ou sigla) da unidade.
 * @apiSuccess {String}   descricao     Descrição da unidade.
 * @apiSuccess {String}   sigla         Sigla da unidade.
 * @apiSuccess {String}   und_padrao    Unidade padrão.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {  
 *      "id": "FD",
 *      "descricao": "FARDO",
 *      "sigla": "FD",
 *      "und_padrao": "UND"
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */


 /**
 * @api {get} /produtos/tabprecos/:id  Consultar tabelas de preços
 * @apiVersion 1.0.0
 * @apiName GetProdutosTabPrecos
 * @apiGroup Produtos
 *
 * @apiHeader {String} Authorization 'Bearer ' + Token obtido no login do usuário.
 * 
 * @apiParam {String} [id]   ID da tabela de preços.
 * @apiParam {Number} [page] Número da página. Obrigatório somente quando <code>id</code> não for informado.
 *
 * @apiSuccess {String}   id            ID (código ou sigla) da unidade.
 * @apiSuccess {String}   descricao     Descrição da tabela de preços.
 *
 * @apiSuccessExample Sucesso:
 *     HTTP/1.1 200 OK
 *    {  
 *      "id": "01",
 *      "descricao": "A VISTA",
 *    }
 *
 * @apiUse ErroRegistroNaoEncontrado
 */

