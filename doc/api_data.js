define({ "api": [
  {
    "type": "get",
    "url": "/areasclientes/:id",
    "title": "Consulta áreas ou regiões de clientes.",
    "version": "1.0.0",
    "name": "getAreasClientes",
    "group": "Clientes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token obtido no login do usuário.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>ID (código) da área de cliente. Quando não informado, a requisição retornará um array de áreas de acordo com o número da página informado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Número da página. Obrigatório somente quando <code>id</code> não for informado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID (código) da área de cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da área de cliente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"00001\",\n  \"nome\": \"ZONA NORTE DE TERESINA\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Clientes",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de status HTTP.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem de erro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro:",
          "content": "HTTP/1.1 404 \n{\n  \"status\": 404,\n  \"message\": \"Registro não encontrado!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/atividades/:id",
    "title": "Consulta atividades dos clientes.",
    "version": "1.0.0",
    "name": "getAtividades",
    "group": "Clientes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token obtido no login do usuário.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>ID (código) da atividade. Quando não informado, a requisição retornará um array de atividades de acordo com a página informada.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Número da página. Obrigatório somente quando <code>id</code> não for informado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID (código) da atividade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da atividade.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"001\",\n  \"nome\": \"COMERCIO VAREJISTA\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Clientes",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de status HTTP.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem de erro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro:",
          "content": "HTTP/1.1 404 \n{\n  \"status\": 404,\n  \"message\": \"Registro não encontrado!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/clientes/:id",
    "title": "Consulta clientes.",
    "version": "1.0.0",
    "name": "getClientes",
    "group": "Clientes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token obtido no login do usuário.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>ID (código) ou CPF ou CNPJ do cliente sem formatação. Quando não informado, a requisição retornará um array de clientes.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "order",
            "description": "<p>Campo a ser utilizado na busca e ordenação dos registros. Somente quando <code>id</code> não for informado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "value",
            "description": "<p>Conteudo do campo de busca informado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Número da página. Obrigatório somente quando <code>id</code> não for informado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID (código) do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome ou razão social do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_fantasia",
            "description": "<p>Nome fantasia do cliente, se pessoa jurídica.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apelido",
            "description": "<p>Apelido do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pessoa",
            "description": "<p>J - pessoa jurídica ou F - pessoa física.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "ativo",
            "description": "<p>Indica se o cliente está ativo (true) ou inativo (false).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data_cad",
            "description": "<p>Data do cadastro do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data_atu",
            "description": "<p>Data da última atualização do cadastro do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_loja",
            "description": "<p>Loja onde o cliente foi cadastrado.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_grupo",
            "description": "<p>Grupo do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cpf_cnpj",
            "description": "<p>CPF ou CNPJ do cliente, sem formatação.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "insc_estadual",
            "description": "<p>Número da Inscrição Estadual do cliente pessoa jurídica.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "endereco",
            "description": "<p>Endereço do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "numero_end",
            "description": "<p>Número do estabelecimento do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bairro",
            "description": "<p>Bairro do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cidade",
            "description": "<p>Cidade do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_municipio",
            "description": "<p>ID (código) do município do cliente conforme tabela do IBGE.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uf",
            "description": "<p>Sigla da unidade federativa do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cep",
            "description": "<p>CEP do cliente, sem formatação.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ponto_ref",
            "description": "<p>Ponto de referência para o endereço do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "telefone",
            "description": "<p>Número do telefone de contato do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "celular",
            "description": "<p>Número do telefone celular do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contato",
            "description": "<p>Nome da pessoa de contato, se o cliente for pessoa jurídica.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data_nasc",
            "description": "<p>Data de nascimento do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sexo",
            "description": "<p>M - Masculino ou F - Femenino.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "consumidor",
            "description": "<p>Indica se o cliente é consumidor final.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sit_cred",
            "description": "<p>Situação de crédito do cliente (A - Aprovado, S - Suspenso, N - Nada consta).</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limite_cred",
            "description": "<p>Valor do limite de crédito do cliente para compras a prazo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "planos",
            "description": "<p>Array contendo o ID dos planos de pagamento permitidos para o cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tabelas",
            "description": "<p>Array contendo o ID das tabelas de preços permitidas para o cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "financeiro",
            "description": "<p>Objeto (json) contendo os dados financeiros do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "financeiro.dias_atraso",
            "description": "<p>Maior número de dias de atraso do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "financeiro.saldo_devedor",
            "description": "<p>Valor total dos débitos do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "financeiro.saldo_acordos",
            "description": "<p>Valor total dos acordos pendentes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "financeiro.debito_atraso",
            "description": "<p>Valor total dos débitos em atraso.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "financeiro.cheques_devol",
            "description": "<p>Valor total dos cheques devolvidos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "financeiro.limite_disp",
            "description": "<p>Valor do limite disponivel para compras a prazo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"id\": \"00000001\",\n    \"nome\": \"DIST.PLASTICO EVANDRO M.OLIVEIRA\",\n    \"nome_fantasia\": \"DISTRIBUIDORA DOS PLASTICOS\",\n    \"apelido\": \"\",\n    \"pessoa\": \"J\",\n    \"ativo\": true,\n    \"data_cad\": \"2007-07-16T03:00:00.000Z\",\n    \"data_atu\": \"2019-03-05T03:00:00.000Z\",\n    \"id_loja\": \"00\",\n    \"id_grupo\": \"0001\",\n    \"cpf_cnpj\": \"03594295000160\",\n    \"insc_estadual\": \"19.445.472-0\",\n    \"endereco\": \"RUA GENERAL LAGES\",\n    \"numero_end\": \"1471 \",\n    \"bairro\": \"JOCKEY\",\n    \"cidade\": \"TERESINA\",\n    \"id_municipio\": \"2211001\",\n    \"uf\": \"PI\",\n    \"cep\": \"64048-350\",\n    \"ponto_ref\": \"PROXIMO A LOJAS AMERICANAS\",\n    \"telefone\": \"(86) 3233-8601\",\n    \"celular\": \"\",\n    \"contato\": \"GERENTE\",\n    \"data_nasc\": null,\n    \"sexo\": \"\",\n    \"consumidor\": false,\n    \"sit_cred\": \"A\",\n    \"limite_cred\": 13500,\n    \"planos\": [\"001\", \"002\", \"004\"],\n    \"tabelas\": [\"01\", \"02\", \"03\"],\n    \"financeiro\": {\n        \"dias_atraso\": 16,\n        \"saldo_devedor\": 7058.6,\n        \"saldo_acordos\": 39.47,\n        \"debito_atraso\": 6837.1,\n        \"cheques_devol\": 0,\n        \"limite_disp\": 6441.4\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/clientes.js",
    "groupTitle": "Clientes",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de status HTTP.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem de erro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro:",
          "content": "HTTP/1.1 404 \n{\n  \"status\": 404,\n  \"message\": \"Registro não encontrado!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "D__projetos_web_link_api_doc_main_js",
    "groupTitle": "D__projetos_web_link_api_doc_main_js",
    "name": ""
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/read.js",
    "group": "D__projetos_web_link_api_node_modules_body_parser_lib_read_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_body_parser_lib_read_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/json.js",
    "group": "D__projetos_web_link_api_node_modules_body_parser_lib_types_json_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_body_parser_lib_types_json_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/raw.js",
    "group": "D__projetos_web_link_api_node_modules_body_parser_lib_types_raw_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_body_parser_lib_types_raw_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/text.js",
    "group": "D__projetos_web_link_api_node_modules_body_parser_lib_types_text_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_body_parser_lib_types_text_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/text.js",
    "group": "D__projetos_web_link_api_node_modules_body_parser_lib_types_text_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_body_parser_lib_types_text_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/urlencoded.js",
    "group": "D__projetos_web_link_api_node_modules_body_parser_lib_types_urlencoded_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_body_parser_lib_types_urlencoded_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/urlencoded.js",
    "group": "D__projetos_web_link_api_node_modules_body_parser_lib_types_urlencoded_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_body_parser_lib_types_urlencoded_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/body-parser/lib/types/urlencoded.js",
    "group": "D__projetos_web_link_api_node_modules_body_parser_lib_types_urlencoded_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_body_parser_lib_types_urlencoded_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/content-disposition/index.js",
    "group": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_content_disposition_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/cookie-signature/index.js",
    "group": "D__projetos_web_link_api_node_modules_cookie_signature_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_cookie_signature_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/cookie-signature/index.js",
    "group": "D__projetos_web_link_api_node_modules_cookie_signature_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_cookie_signature_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/browser.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_browser_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_browser_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/browser.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_browser_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_browser_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/browser.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_browser_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_browser_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/browser.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_browser_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_browser_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/browser.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_browser_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_browser_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/debug.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_debug_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/node.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_node_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_node_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/node.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_node_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_node_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/debug/src/node.js",
    "group": "D__projetos_web_link_api_node_modules_debug_src_node_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_debug_src_node_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/etag/index.js",
    "group": "D__projetos_web_link_api_node_modules_etag_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_etag_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/express.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_express_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_express_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/middleware/init.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_middleware_init_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_middleware_init_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/middleware/query.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_middleware_query_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_middleware_query_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/layer.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_router_layer_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_router_layer_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/layer.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_router_layer_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_router_layer_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/layer.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_router_layer_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_router_layer_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/router/route.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_router_route_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_router_route_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/express/lib/utils.js",
    "group": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_express_lib_utils_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/jsonwebtoken/node_modules/ms/index.js",
    "group": "D__projetos_web_link_api_node_modules_jsonwebtoken_node_modules_ms_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_jsonwebtoken_node_modules_ms_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/jsonwebtoken/node_modules/ms/index.js",
    "group": "D__projetos_web_link_api_node_modules_jsonwebtoken_node_modules_ms_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_jsonwebtoken_node_modules_ms_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/jsonwebtoken/node_modules/ms/index.js",
    "group": "D__projetos_web_link_api_node_modules_jsonwebtoken_node_modules_ms_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_jsonwebtoken_node_modules_ms_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/jsonwebtoken/node_modules/ms/index.js",
    "group": "D__projetos_web_link_api_node_modules_jsonwebtoken_node_modules_ms_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_jsonwebtoken_node_modules_ms_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/media-typer/index.js",
    "group": "D__projetos_web_link_api_node_modules_media_typer_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_media_typer_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/media-typer/index.js",
    "group": "D__projetos_web_link_api_node_modules_media_typer_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_media_typer_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/media-typer/index.js",
    "group": "D__projetos_web_link_api_node_modules_media_typer_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_media_typer_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/media-typer/index.js",
    "group": "D__projetos_web_link_api_node_modules_media_typer_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_media_typer_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/media-typer/index.js",
    "group": "D__projetos_web_link_api_node_modules_media_typer_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_media_typer_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/ms/index.js",
    "group": "D__projetos_web_link_api_node_modules_ms_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_ms_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/ms/index.js",
    "group": "D__projetos_web_link_api_node_modules_ms_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_ms_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/ms/index.js",
    "group": "D__projetos_web_link_api_node_modules_ms_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_ms_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/ms/index.js",
    "group": "D__projetos_web_link_api_node_modules_ms_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_ms_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/on-headers/index.js",
    "group": "D__projetos_web_link_api_node_modules_on_headers_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_on_headers_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/path-to-regexp/index.js",
    "group": "D__projetos_web_link_api_node_modules_path_to_regexp_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_path_to_regexp_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "private",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Private"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/send/index.js",
    "group": "D__projetos_web_link_api_node_modules_send_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_send_index_js",
    "name": "Public"
  },
  {
    "type": "",
    "url": "public",
    "title": "",
    "version": "0.0.0",
    "filename": "./node_modules/utils-merge/index.js",
    "group": "D__projetos_web_link_api_node_modules_utils_merge_index_js",
    "groupTitle": "D__projetos_web_link_api_node_modules_utils_merge_index_js",
    "name": "Public"
  },
  {
    "type": "get",
    "url": "/bancos/:id",
    "title": "Consulta bancos.",
    "version": "1.0.0",
    "name": "getBancos",
    "group": "Outros_Cadastros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token obtido no login do usuário.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>ID (código) do banco. Quando não informado, a requisição retornará um array de bancos de acordo com a página informada.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Número da página. Obrigatório somente quando <code>id</code> não for informado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID (código) do banco.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do banco.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sigla",
            "description": "<p>Sigla do banco.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"0001\",\n  \"nome\": \"BANCO DO BRASIL\",\n  \"sigla\": \"BB\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros_Cadastros",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de status HTTP.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem de erro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro:",
          "content": "HTTP/1.1 404 \n{\n  \"status\": 404,\n  \"message\": \"Registro não encontrado!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/centroscustos/:id",
    "title": "Consulta centros de custos",
    "version": "1.0.0",
    "name": "getCentrosCustos",
    "group": "Outros_Cadastros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token obtido no login do usuário.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>ID (código) do centro de custo. Quando não informado, a requisição retornará um array de centros de custos de acordo com a página informada.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Número da página. Obrigatório somente quando <code>id</code> não for informado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID (código) do centro de custo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do centro de custo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "classificacao",
            "description": "<p>Classificação do centro de custo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"01\",\n  \"nome\": \"RECURSOS HUMANOS\",\n  \"classificacao\": \"01.001.001\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros_Cadastros",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de status HTTP.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem de erro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro:",
          "content": "HTTP/1.1 404 \n{\n  \"status\": 404,\n  \"message\": \"Registro não encontrado!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/formaspag/:id",
    "title": "Consulta Formas (meios) de pagamentos",
    "version": "1.0.0",
    "name": "getFormasPag",
    "group": "Outros_Cadastros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token obtido no login do usuário.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>ID (código) da forma de pagamento. Quando não informado, a requisição retornará um array de formas de pagamentos.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Número da página. Obrigatório somente quando <code>id</code> não for informado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID (código) da forma de pagamento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da forma de pagamento.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "parcelas",
            "description": "<p>Indica se a forma de pagamento gera parcelas.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "cheques",
            "description": "<p>Indica se a forma de pagamento requisita lançamento de cheques.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cartao",
            "description": "<p>Tipo de cartão de crédito usado no pagamento (TEF).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"01\",\n  \"nome\": \"CARTAO DE CREDITO\",\n  \"parcelas\": false,\n  \"cheques\": false,\n  \"cartao\": \"TODOS\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros_Cadastros",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de status HTTP.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem de erro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro:",
          "content": "HTTP/1.1 404 \n{\n  \"status\": 404,\n  \"message\": \"Registro não encontrado!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/fornecedores/:id",
    "title": "Consulta Fornecedores",
    "version": "1.0.0",
    "name": "getFornecedores",
    "group": "Outros_Cadastros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token obtido no login do usuário.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>ID (código) ou CNPJ ou CPF fornecedor, sem formatação. Quando não informado, a requisição retornará um array de fornecedores.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "order",
            "description": "<p>Campo a ser utilizado na busca e ordenação dos registros. Somente quando <code>id</code> não for informado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "value",
            "description": "<p>Conteudo do campo de busca informado.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Número da página. Obrigatório somente quando <code>id</code> não for informado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID (código) do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome ou razão social do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_fantasia",
            "description": "<p>Nome fantasia do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pessoa",
            "description": "<p>F - Física ou J - Jurídica.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "ativo",
            "description": "<p>Indica se o fornecedor está ou não ativo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "endereco",
            "description": "<p>Endereço do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "numero_end",
            "description": "<p>Número do estabelecimento do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bairro",
            "description": "<p>Bairro do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cidade",
            "description": "<p>Cidade do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uf",
            "description": "<p>UF do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cep",
            "description": "<p>CEP do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "telefone",
            "description": "<p>Número do telefone do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "celular",
            "description": "<p>Número do celular do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do fornecedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cnpj_cpf",
            "description": "<p>CNPJ ou CPF do fornecedor, sem formatação.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "insc_estadual",
            "description": "<p>Inscrição Estadual do fornecedor.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"id\": \"00000071\",\n    \"nome\": \"ALDO COMPONENTES ELETRONICOS LTDA.\",\n    \"nome_fantasia\": \"ALDO COMPONENTES ELETRONICOS L\",\n    \"pessoa\": \"J\",\n    \"ativo\": false,\n    \"endereco\": \"R PORTO ALEGRE\",\n    \"numero_end\": \"307 \",\n    \"bairro\": \"NOVA ZELANDIA\",\n    \"cidade\": \"SERRA\",\n    \"uf\": \"ES\",\n    \"cep\": \"29175-706\",\n    \"telefone\": \"(44) 3261-2000\",\n    \"celular\": \"\",\n    \"email: \"contato@aldo.com.br\",\n    \"cnpj_cpf\": \"81106957000208\",\n    \"insc_estadual\": \"082804931\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros_Cadastros",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de status HTTP.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem de erro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro:",
          "content": "HTTP/1.1 404 \n{\n  \"status\": 404,\n  \"message\": \"Registro não encontrado!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Realiza o login de usuário na API",
    "name": "PostLogin",
    "group": "Usu_rios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "usuario",
            "description": "<p>Nome do usuário.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senha",
            "description": "<p>Senha do usuário.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_loja",
            "description": "<p>ID da loja onde o usuário estará logado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Retorna sempre <code>true</code>, indicando sucesso no login.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do usuário a ser usado nas próximas requisições.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiJKICAiLCJpZExvamEiOiIwMCIsImlhdCI6MTU1MTgwODY3OSwiZXhwIjoxNTUxODk1MDc5fQ.JaVTco1LPPK5BVhIhIdpvq4vSlUucJEzzQyxT1u8YqY\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Retorna sempre <code>false</code>, indicando falha no login.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensagem de erro do login.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"message\": \"Usuário ou senha inválido!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/login.js",
    "groupTitle": "Usu_rios"
  }
] });
