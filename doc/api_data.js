define({ "api": [
  {
    "type": "get",
    "url": "/areasclientes/:id",
    "title": "Consultar áreas ou regiões",
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
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
    "title": "Consultar atividades",
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
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
    "title": "Consultar clientes",
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
    "type": "get",
    "url": "/gruposclientes/:id",
    "title": "Consultar grupos",
    "version": "1.0.0",
    "name": "getGruposClientes",
    "group": "Clientes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do grupo de cliente. Quando não informado, a requisição retornará um array de grupos de clientes.</p>"
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
            "description": "<p>ID (código) do grupo de clientes.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do grupo de clientes.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"001\",\n  \"nome\": \"CLIENTE VIP\"\n}",
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
    "type": "post",
    "url": "/clientes",
    "title": "Incluir um novo cliente",
    "version": "1.0.0",
    "name": "postClientes",
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
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>true</code>.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_cliente",
            "description": "<p>ID do cliente cadastrado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"sucesso\": true,\n    \"id_cliente\": \"00037654\",\n}",
          "type": "json"
        }
      ]
    },
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
          "content": "HTTP/1.1 500 \n{\n  \"status\": 500,\n  \"message\": \"O CPF ou CNPJ já consta no cadastro do cliente 00003739!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/clientes.js",
    "groupTitle": "Clientes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome completo ou razão social do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nome_fantasia",
            "description": "<p>Nome fantasia do cliente, se pessoa jurídica.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "apelido",
            "description": "<p>Apelido do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pessoa",
            "description": "<p>J - pessoa jurídica ou F - pessoa física.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cpf_cnpj",
            "description": "<p>CPF ou CNPJ do cliente, sem formatação.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "insc_estadual",
            "description": "<p>Número da Inscrição Estadual do cliente pessoa jurídica.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endereco",
            "description": "<p>Endereço do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "numero_end",
            "description": "<p>Número do estabelecimento do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bairro",
            "description": "<p>Bairro do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cidade",
            "description": "<p>Cidade do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_municipio",
            "description": "<p>ID (código) do município do cliente conforme tabela do IBGE.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uf",
            "description": "<p>Sigla da unidade federativa do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cep",
            "description": "<p>CEP do cliente, sem formatação.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "ponto_ref",
            "description": "<p>Ponto de referência para o endereço do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "telefone",
            "description": "<p>Número do telefone de contato do cliente no formato (99) 9999-9999 ou (99)99999-9999.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "celular",
            "description": "<p>Número do telefone celular do cliente no formato (99)99999-9999.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>E-mail do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "data_nasc",
            "description": "<p>Data de nascimento do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sexo",
            "description": "<p>M - Masculino ou F - Feminino. Obrigatório quando for pessoa física.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "consumidor",
            "description": "<p>Indica se o cliente é consumidor final.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "crt",
            "description": "<p>Código de Regime de Tributação. Obrigatório quando for pessoa jurídica.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/clientes/:id",
    "title": "Alterar dados de um cliente",
    "version": "1.0.0",
    "name": "puttClientes",
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
            "optional": false,
            "field": "id",
            "description": "<p>ID (Código) do cliente a ser atualizado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome completo ou razão social do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nome_fantasia",
            "description": "<p>Nome fantasia do cliente, se pessoa jurídica.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "apelido",
            "description": "<p>Apelido do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pessoa",
            "description": "<p>J - pessoa jurídica ou F - pessoa física.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cpf_cnpj",
            "description": "<p>CPF ou CNPJ do cliente, sem formatação.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "insc_estadual",
            "description": "<p>Número da Inscrição Estadual do cliente pessoa jurídica.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endereco",
            "description": "<p>Endereço do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "numero_end",
            "description": "<p>Número do estabelecimento do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bairro",
            "description": "<p>Bairro do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cidade",
            "description": "<p>Cidade do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_municipio",
            "description": "<p>ID (código) do município do cliente conforme tabela do IBGE.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uf",
            "description": "<p>Sigla da unidade federativa do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cep",
            "description": "<p>CEP do cliente, sem formatação.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "ponto_ref",
            "description": "<p>Ponto de referência para o endereço do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "telefone",
            "description": "<p>Número do telefone de contato do cliente no formato (99) 9999-9999 ou (99)99999-9999.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "celular",
            "description": "<p>Número do telefone celular do cliente no formato (99)99999-9999.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>E-mail do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "data_nasc",
            "description": "<p>Data de nascimento do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sexo",
            "description": "<p>M - Masculino ou F - Feminino. Obrigatório quando for pessoa física.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "consumidor",
            "description": "<p>Indica se o cliente é consumidor final.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "crt",
            "description": "<p>Código de Regime de Tributação. Obrigatório quando for pessoa jurídica.</p>"
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
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>true</code>.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_cliente",
            "description": "<p>ID do cliente alterado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": "\n    HTTP/1.1 200 OK\n{\n    \"sucesso\": true,\n    \"id_cliente\": \"00037654\",\n}",
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
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>false</code>.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String[]",
            "optional": false,
            "field": "erros",
            "description": "<p>Array cotendo uma lista de mensagens de erros.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Erro:",
          "content": "HTTP/1.1 400 \n{\n  \"sucesso\": false,\n  \"erros\": [\n     \"CPF inválido.\",\n     \"Endereço não informado.\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/clientes.js",
    "groupTitle": "Clientes"
  },
  {
    "type": "get",
    "url": "/ocrcobrancas/:id",
    "title": "Consultar ocorrencias de cobranças",
    "version": "1.0.0",
    "name": "getOcrCobrancas",
    "group": "Cobranca",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) da ocorrência. Quando não informado, a requisição retornará um array de ocorrências.</p>"
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
            "description": "<p>ID (código) da ocorrência.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição da ocorrência.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "pagar_comissao",
            "description": "<p>Indica se a ocorrência vair gerar comissão para o cobrador.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "pedir_prazo",
            "description": "<p>Indica se a ocorrência irá solicitar um prazo para pagamento.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "fim_cobranca",
            "description": "<p>Indica se a ocorrência vai encerrar o ciclo de cobrança.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "carencia",
            "description": "<p>Número de dias de carência para uso da ocorrência.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"01\",\n  \"descricao\": \"MUDANCA DE COBRADOR\",\n  \"pagar_comissao\": false,\n  \"pedir_prazo\": false,\n  \"fim_cobranca\": false,\n  \"carencia\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Cobranca",
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
    "url": "/tiposcobrancas/:id",
    "title": "Consultar tipos de cobranças",
    "version": "1.0.0",
    "name": "getTiposCobrancas",
    "group": "Cobranca",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do tipo de cobrança. Quando não informado, a requisição retornará um array tipos de cobranças.</p>"
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
            "description": "<p>ID (código) do tipo de cobrança.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição do tipo de cobrança.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"01\",\n  \"descricao\": \"COBRANÇA INTERNA\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Cobranca",
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
    "type": "get",
    "url": "/ofsituacoes/:id",
    "title": "Consultar situações de serviços",
    "version": "1.0.0",
    "name": "getOfSituacoes",
    "group": "Oficina",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) da situação. Quando não informado, a requisição retornará um array de situações.</p>"
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
            "description": "<p>ID (código) da situação.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição da situação.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"CA\",\n  \"descricao\": \"CANCELADO\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Oficina",
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
    "url": "/bancos/:id",
    "title": "Consultar bancos",
    "version": "1.0.0",
    "name": "getBancos",
    "group": "Outros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
    "groupTitle": "Outros",
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
    "title": "Consultar centros de custos",
    "version": "1.0.0",
    "name": "getCentrosCustos",
    "group": "Outros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
    "groupTitle": "Outros",
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
    "title": "Consultar fornecedores",
    "version": "1.0.0",
    "name": "getFornecedores",
    "group": "Outros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
          "content": "HTTP/1.1 200 OK\n\n{\n    \"id\": \"00000071\",\n    \"nome\": \"ALDO COMPONENTES ELETRONICOS LTDA.\",\n    \"nome_fantasia\": \"ALDO COMPONENTES ELETRONICOS L\",\n    \"pessoa\": \"J\",\n    \"ativo\": true,\n    \"endereco\": \"R PORTO ALEGRE\",\n    \"numero_end\": \"307 \",\n    \"bairro\": \"NOVA ZELANDIA\",\n    \"cidade\": \"SERRA\",\n    \"uf\": \"ES\",\n    \"cep\": \"29175-706\",\n    \"telefone\": \"(44) 3261-2000\",\n    \"celular\": \"\",\n    \"email: \"contato@aldo.com.br\",\n    \"cnpj_cpf\": \"81106957000208\",\n    \"insc_estadual\": \"082804931\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros",
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
    "url": "/funcionarios/:id",
    "title": "Consultar funcionários",
    "version": "1.0.0",
    "name": "getFuncionarios",
    "group": "Outros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do funcionário. Quando não informado, a requisição retornará um array de funcionários.</p>"
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
            "description": "<p>ID (código) do funcionário.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do funcionário.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apelido",
            "description": "<p>Apelido do funcionário.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "funcao",
            "description": "<p>V - Vendedor C - Cobrador ou S - Supervisor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_loja",
            "description": "<p>ID da loja onde o funcionário está localizado.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "ativo",
            "description": "<p>Indica se o funcionário está ou não ativo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"id\": \"023\",\n    \"nome\": \"LUIS HENRIQUE DE SOUSA\",\n    \"apelido\": \"LUIS HENRIQUE\",\n    \"funcao\": \"V\",\n    \"id_loja\": \"01\",\n    \"ativo\": true\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros",
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
    "url": "/lojas/:id",
    "title": "Consultar lojas",
    "version": "1.0.0",
    "name": "getLojas",
    "group": "Outros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) da loja. Quando não informado, a requisição retornará um array de centros de lojas.</p>"
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
            "description": "<p>ID (código) da loja.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da loja.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "razao_social",
            "description": "<p>Razão Social da loja.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_fantasia",
            "description": "<p>Nome fantasia da loja.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cnpj",
            "description": "<p>CNPJ da loja.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "insc_estadual",
            "description": "<p>Inscrição estadual da loja.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"00\",\n  \"nome\": \"MATRIZ\",\n  \"razao_social\": \"NORTELINK TECNOLOGIA EM SISTEMAS LTDA\",\n  \"nome_fantasia\": \"NORTELINK SISTEMAS\",\n  \"cnpj\": \"12.743.428/0001-03\",\n  \"insc_estadual\": \"12.123.123-1\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros",
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
    "url": "/municipios/:id",
    "title": "Consultar municípios",
    "version": "1.0.0",
    "name": "getMunicipios",
    "group": "Outros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do município. Quando não informado, a requisição retornará um array de municípios.</p>"
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
            "description": "<p>ID (código) do município.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do município.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uf",
            "description": "<p>UF do município.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cod_siaf",
            "description": "<p>Código do município no SIAF.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"2211001\",\n  \"nome\": \"TERESINA\",\n  \"uf\": \"PI\",\n  \"cod_siaf\": \"1219\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros",
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
    "url": "/portadores/:id",
    "title": "Consultar portadores",
    "version": "1.0.0",
    "name": "getPortadores",
    "group": "Outros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do portador. Quando não informado, a requisição retornará um array de portadores.</p>"
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
            "description": "<p>ID (código) do portador.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do portador.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sigla",
            "description": "<p>Sigla do portador.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "spc",
            "description": "<p>Indica se o portador é o SPC.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"0013\",\n  \"nome\": \"ESCRITORIO DE ADVOCACIA\",\n  \"sigla\": \"ADVOGADO\",\n  \"spc\": false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros",
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
    "url": "/tiposdocumentos/:id",
    "title": "Consultar tipos de documentos",
    "version": "1.0.0",
    "name": "getTiposDocumentos",
    "group": "Outros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do tipo de documento. Quando não informado, a requisição retornará um array tipos de documentos.</p>"
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
            "description": "<p>ID (código) do tipo de documento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição do tipo de documento.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"DP\",\n  \"descricao\": \"DUPLICATA\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros",
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
    "url": "/transportadoras/:id",
    "title": "Consultar transportadoras",
    "version": "1.0.0",
    "name": "getTransportadoras",
    "group": "Outros",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) da transportadora. Quando não informado, a requisição retornará um array de transportadoras.</p>"
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
            "description": "<p>ID (código) da transportadora.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da transportadora.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "via_transp",
            "description": "<p>Via de transporte.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "endereco",
            "description": "<p>Endereço da transportadora.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "numero_end",
            "description": "<p>Número do estabelecimento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bairro",
            "description": "<p>Nome do bairro.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cidade",
            "description": "<p>Nome da cidade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_municipio",
            "description": "<p>ID do município, conforme tabela do IBGE.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uf",
            "description": "<p>UF.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cep",
            "description": "<p>CEP.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "telefone",
            "description": "<p>Número do telefone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contato",
            "description": "<p>Nome da pessoa de contato.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cnpj",
            "description": "<p>CNPJ da transportadora.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "insc_estadual",
            "description": "<p>Inscrição Estadual da transportadora.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n     \"id\": \"013\",\n     \"nome\": \"TRANSPORTADORA SAYMON\",\n     \"via_transp\": \"RODOVIARIO\",\n     \"endereco\": \"RUA MAGALHAES FILHO\",\n     \"numero_end\": \"123\",\n     \"bairro\": \"AEROPORTO\",\n     \"cidade\": \"TERESINA\",\n     \"id_municipio\": \"2211001\",\n     \"uf\": \"PI\",\n     \"cep\": \"64002-450\",\n     \"telefone\": \"(86) 3223-6661\",\n     \"contato\": \"NATAN\",\n     \"cnpj\": \"12.123.123/0001-12\",\n     \"insc_estadual\": \"12.123.123-1\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Outros",
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
    "url": "/prevendas",
    "title": "Consultar pré-vendas no período",
    "version": "1.0.0",
    "name": "getPreVendas",
    "group": "Pre_vendas",
    "description": "<p>Esta requisição retorna um array de pré-vendas geradas no período informado, de acordo com a página informada. Os itens das pré-vendas não serão retornados.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "data_ini",
            "description": "<p>Data inicial do periodo.</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "data_fim",
            "description": "<p>Data final do período.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Número da página.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id_cliente",
            "description": "<p>ID do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id_plano_pag",
            "description": "<p>ID do plano de pagamento.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "situacao",
            "description": "<p>String contendo as situações a serem consultadas. Ex.: &quot;PCF&quot; para consultar pré-vendas Pendentes, Canceladas e Faturadas.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id_posicao",
            "description": "<p>ID da posição da pré-venda.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código do status HTTP.</p>"
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
          "content": "HTTP/1.1 404 \n{\n  \"status\": 404,\n  \"message\": \"Pré-vendas não encontradas!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/prevendas.js",
    "groupTitle": "Pre_vendas"
  },
  {
    "type": "get",
    "url": "/prevendas/:numero",
    "title": "Consultar uma pré-venda pelo número",
    "version": "1.0.0",
    "name": "getPreVendasNumero",
    "group": "Pre_vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "optional": false,
            "field": "numero",
            "description": "<p>Número da pré-venda a ser consultada.</p>"
          }
        ]
      }
    },
    "filename": "./routes/cadastros/prevendas.js",
    "groupTitle": "Pre_vendas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_loja",
            "description": "<p>ID da loja onde a pré-venda foi gerada.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "numero",
            "description": "<p>Número da pré-venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data",
            "description": "<p>Data que a pré-venda foi gerada.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_vendedor",
            "description": "<p>ID do vendedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_vendedor",
            "description": "<p>Nome do vendedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_cliente",
            "description": "<p>ID do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_cliente",
            "description": "<p>Nome do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_tab_preco",
            "description": "<p>ID da tabela de preço usada na pré-venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_parceiro",
            "description": "<p>ID do parceiro (indicador).</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "qt_itens",
            "description": "<p>Número de itens lançados na pré-venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vl_itens",
            "description": "<p>Valor da soma total dos itens.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vl_acrescimo",
            "description": "<p>Valor de acréscimo sobre os itens.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vl_desconto",
            "description": "<p>Valor de desconto sobre os itens.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vl_total",
            "description": "<p>Valor total da pré-venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_plano_pag",
            "description": "<p>ID do plano de pagamento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_plano_pag",
            "description": "<p>Nome do plano de pagamento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "forma_pag",
            "description": "<p>ID da forma de pagamento gerada pelo plano.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vl_entrada",
            "description": "<p>Valor de entrada, para o caso de venda a prazo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcelas",
            "description": "<p>Número de parcelas de pagamento geradas.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vl_parcela",
            "description": "<p>Valor da parcela de pagamento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "situacao",
            "description": "<p>Situação da pré-venda: P-Pendente F-Faturada C-Cancelada I-Irregular</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_pos",
            "description": "<p>ID da posição atual da pré-venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data_pos",
            "description": "<p>Data de lançamento da posição da pré-venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mod_venda",
            "description": "<p>Modalidade da venda: 0-Normal 1-Futura 9-NFC-e.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data_entrega",
            "description": "<p>Data prevista para entrega dos produtos.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hora_entrega",
            "description": "<p>Hora prevista para entrega dos produtos.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipo_entrega",
            "description": "<p>Tipo de entrega: 0-Cliente retira 1-Loja faz a entrega</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_end_entrega",
            "description": "<p>ID do endereço de entrega do cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_loja_sep",
            "description": "<p>ID da loja de separação dos produtos.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_obra",
            "description": "<p>ID da obra cadastrada.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_opcom",
            "description": "<p>ID da operação comercial de venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "num_venda",
            "description": "<p>Número da venda gerada na operação comercial.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data_venda",
            "description": "<p>Data da venda gerada.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "num_nfe",
            "description": "<p>Número da NF-e ou NFC-e gerada.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "itens",
            "description": "<p>Array contendo a lista de itens da pré-venda.</p>"
          }
        ],
        "Campos do item da pré-venda": [
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "seq",
            "description": "<p>Sequência do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "id_produto",
            "description": "<p>Código do produto ou serviço.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "referencia",
            "description": "<p>Referência do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "especie",
            "description": "<p>Espécie do item: P-Produto ou S-Serviço.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "compl_descr",
            "description": "<p>Complemento da descrição do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "pos_grade",
            "description": "<p>Posição da grade do produto no formato 9999.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "lin_grade",
            "description": "<p>Descrição da linha da grade.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "col_grade",
            "description": "<p>Descrição da coluna da grade.</p>"
          },
          {
            "group": "pvItem",
            "type": "Number",
            "optional": false,
            "field": "quantidade",
            "description": "<p>Quantidade do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "Boolean",
            "optional": false,
            "field": "fracionado",
            "description": "<p>Indica se o item foi vendido em unidades fracionadas.</p>"
          },
          {
            "group": "pvItem",
            "type": "Number",
            "optional": false,
            "field": "preco",
            "description": "<p>Preço unitário do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "Number",
            "optional": false,
            "field": "pdesc",
            "description": "<p>Percentual e desconto sobre o preço do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "Number",
            "optional": false,
            "field": "vl_total",
            "description": "<p>Valor total do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "Boolean",
            "optional": false,
            "field": "promocao",
            "description": "<p>Indica se o produto foi vendido com preço de promoção.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id_loja\":\"00\",\n   \"numero\":\"2027\",\n   \"data\":\"2015-12-14T02:00:00.000Z\",\n   \"id_vendedor\":\"001\",\n   \"nome_vendedor\":\"LUIS CARLOS\",\n   \"id_cliente\":\"00000001\",\n   \"nome_cliente\":\"FRANCISCO OLIVEIRA COSMETICOS LTDA\",\n   \"id_tab_preco\":\"01\",\n   \"id_parceiro\":\"00034\",\n   \"qt_itens\":1,\n   \"vl_itens\":152.25,\n   \"vl_acrescimo\":0,\n   \"vl_desconto\":10.10,\n   \"vl_total\":142.15,\n   \"id_plano_pag\":\"001\",\n   \"nome_plano_pag\":\"A VISTA\",\n   \"forma_pag\":\"01\",\n   \"vl_entrada\":0,\n   \"parcelas\":0,\n   \"vl_parcela\":0,\n   \"situacao\":\"F\",\n   \"id_pos\":\"\",\n   \"data_pos\":null,\n   \"mod_venda\":\"0\",\n   \"data_entrega\":\"2015-12-14T02:00:00.000Z\",\n   \"hora_entrega\":\"15:00:00\",\n   \"tipo_entrega\":\"0\",\n   \"id_end_entrega\":\"\",\n   \"id_loja_sep\":\"00\",\n   \"id_obra\":\"\",\n   \"id_opcom\":\"10\",\n   \"num_venda\":\"5219\",\n   \"data_venda\":\"2015-12-14T02:00:00.000Z\",\n   \"num_nfe\":\"40\",\n   \"itens\":[\n       {\n         \"seq\":\"001\",\n         \"id_produto\":\"00001\",\n         \"cod_barras\":\"9788537909294\",\n         \"descricao\":\"LEITE ITAMBE PLUS CXA C/20 UND\",\n         \"referencia\":\"ABC-DEF-GHI-JKLM-NOP\",\n         \"especie\":\"P\",\n         \"compl_descr\":\"\",\n         \"pos_grade\":\"\",\n         \"lin_grade\":\"\",\n         \"col_grade\":\"\",\n         \"quantidade\":1,\n         \"fracionado\":false,\n         \"unidade\":\"CXA\",\n         \"preco\":152.25,\n         \"pdesc\":0,\n         \"vl_total\":152.25,\n         \"promocao\":false\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código do status HTTP.</p>"
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
          "content": "HTTP/1.1 404 \n{\n  \"status\": 404,\n  \"message\": \"Pré-venda 4547 não encontrada na loja 01 !\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/prevendas/:numero/itens",
    "title": "Consultar os itens de uma pré-venda",
    "version": "1.0.0",
    "name": "getPreVendasNumeroItens",
    "group": "Pre_vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "optional": false,
            "field": "numero",
            "description": "<p>Número da pré-venda a ser consultada.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso:",
          "content": "HTTP/1.1 200 OK\n[ \n   {\n      \"seq\":\"001\",\n      \"id_produto\":\"00001\",\n      \"cod_barras\":\"9788537909294\",\n      \"descricao\":\"LEITE ITAMBE PLUS CXA C/20 UND\",\n      \"referencia\":\"ABC-DEF-GHI-JKLM-NOP\",\n      \"especie\":\"P\",\n      \"compl_descr\":\"\",\n      \"pos_grade\":\"\",\n      \"lin_grade\":\"\",\n      \"col_grade\":\"\",\n      \"quantidade\":1,\n      \"fracionado\":false,\n      \"unidade\":\"CXA\",\n      \"preco\":152.25,\n      \"pdesc\":0,\n      \"vl_total\":152.25,\n      \"promocao\":false\n   }\n]",
          "type": "json"
        }
      ],
      "fields": {
        "Campos do item da pré-venda": [
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "seq",
            "description": "<p>Sequência do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "id_produto",
            "description": "<p>Código do produto ou serviço.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "referencia",
            "description": "<p>Referência do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "especie",
            "description": "<p>Espécie do item: P-Produto ou S-Serviço.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "compl_descr",
            "description": "<p>Complemento da descrição do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "pos_grade",
            "description": "<p>Posição da grade do produto no formato 9999.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "lin_grade",
            "description": "<p>Descrição da linha da grade.</p>"
          },
          {
            "group": "pvItem",
            "type": "String",
            "optional": false,
            "field": "col_grade",
            "description": "<p>Descrição da coluna da grade.</p>"
          },
          {
            "group": "pvItem",
            "type": "Number",
            "optional": false,
            "field": "quantidade",
            "description": "<p>Quantidade do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "Boolean",
            "optional": false,
            "field": "fracionado",
            "description": "<p>Indica se o item foi vendido em unidades fracionadas.</p>"
          },
          {
            "group": "pvItem",
            "type": "Number",
            "optional": false,
            "field": "preco",
            "description": "<p>Preço unitário do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "Number",
            "optional": false,
            "field": "pdesc",
            "description": "<p>Percentual e desconto sobre o preço do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "Number",
            "optional": false,
            "field": "vl_total",
            "description": "<p>Valor total do item.</p>"
          },
          {
            "group": "pvItem",
            "type": "Boolean",
            "optional": false,
            "field": "promocao",
            "description": "<p>Indica se o produto foi vendido com preço de promoção.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código do status HTTP.</p>"
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
          "content": "HTTP/1.1 404 \n{\n  \"status\": 404,\n  \"message\": \"Os itens da pré-venda não foram encontrados !\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/prevendas.js",
    "groupTitle": "Pre_vendas"
  },
  {
    "type": "post",
    "url": "/prevendas",
    "title": "Gerar uma nova pré-venda",
    "version": "1.0.0",
    "name": "postPreVendas",
    "group": "Pre_vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id_venda",
            "description": "<p>ID da venda temporária a ser transformada em pré-venda.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_cliente",
            "description": "<p>ID (código) do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_vendedor",
            "description": "<p>ID do vendedor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_tab_preco",
            "description": "<p>ID da tabela de preço.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_plano_pag",
            "description": "<p>ID do plano de pagamento.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id_pos",
            "description": "<p>ID da posição inicial da pré-venda.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mod_venda",
            "description": "<p>Modalidade da venda. 1-Normal 2-Futura ou 9-NFC-e</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "vl_tabela",
            "description": "<p>Valor total dos produtos (quantidade x preço de tabela).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "vl_itens",
            "description": "<p>Valor total dos produtos.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "vl_desconto",
            "description": "<p>Valor do desconto concedido nos produtos.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "vl_acrescimo",
            "description": "<p>Valor do acréscimo sobre os produtos.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "vl_total",
            "description": "<p>Valor total da venda.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "vl_entrada",
            "description": "<p>Valor de entrada, caso a venda seja a prazo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "parcelas",
            "description": "<p>Quantidade de parcelas de pagamento, se a venda for a prazo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "vl_parcela",
            "description": "<p>Valor da parcela de pagamento, se a venda for a prazo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "data_entrega",
            "description": "<p>Data de entrega dos produtos.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tipo_entrega",
            "description": "<p>Tipo de entrega. 0-Cliente retira ou 1-Loja entrega.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id_end_entrega",
            "description": "<p>ID do endereço de entrega do cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id_loja_sep",
            "description": "<p>ID da loja de separação dos produtos.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id_obra",
            "description": "<p>ID da obra.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id_parceiro",
            "description": "<p>ID do parceiro (indicador).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "obs",
            "description": "<p>Observações referentes a venda.</p>"
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
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>true</code>.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_loja",
            "description": "<p>ID da loja onde a pré-venda foi gerada.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_prevenda",
            "description": "<p>Número da pré-venda gerada.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vl_total",
            "description": "<p>Valor total da pré-venda gerada.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"sucesso\": true,\n  \"id_loja\": \"01\",\n  \"id_prevenda\": \"112654\",\n  \"vl_total\": 1543.45\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/prevendas.js",
    "groupTitle": "Pre_vendas",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>false</code>.</p>"
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
          "content": "HTTP/1.1 404 \n{\n  \"sucesso\": false,\n  \"message\": \"O ID 43 da venda não existe!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/produtos/grupos/:id",
    "title": "Consultar grupos",
    "version": "1.0.0",
    "name": "GetProdutosGrupos",
    "group": "Produtos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do grupo de produtos. Quando não informado, a requisição retornará um array de grupos.</p>"
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
            "description": "<p>ID (código) do grupo de produtos.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_grupo",
            "description": "<p>Nome do grupo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_subgrupo",
            "description": "<p>Nome do subgrupo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"01001\",\n  \"nome_grupo\": \"MATERIAIS ELETRICOS\",\n  \"nome_subgrupo\": \"LUMINARIAS\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/produtos.js",
    "groupTitle": "Produtos",
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
    "url": "/produtos/unidades/:id",
    "title": "Consultar unidades",
    "version": "1.0.0",
    "name": "GetProdutosUnidades",
    "group": "Produtos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código ou sigla) da unidade. Quando não informado, a requisição retornará um array de unidades.</p>"
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
            "description": "<p>ID (código ou sigla) da unidade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição da unidade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sigla",
            "description": "<p>Sigla da unidade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "und_padrao",
            "description": "<p>Unidade padrão.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{  \n  \"id\": \"FD\",\n  \"descricao\": \"FARDO\",\n  \"sigla\": \"FD\",\n  \"und_padrao\": \"UND\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/produtos.js",
    "groupTitle": "Produtos",
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
    "url": "/gradesprodutos/:id",
    "title": "Consultar grades",
    "version": "1.0.0",
    "name": "getGradesProdutos",
    "group": "Produtos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) da grade de produtos. Quando não informado, a requisição retornará um array de grades de produtos.</p>"
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
            "description": "<p>ID (código) da grade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição da grade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descr_linha",
            "description": "<p>Descrição da linha da grade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descr_coluna",
            "description": "<p>Descrição das colunas da grade.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "linhas",
            "description": "<p>Array contendo os dados das linhas da grade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "linhas.seq",
            "description": "<p>Posição da linha de grade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "linhas.descricao",
            "description": "<p>Descrição da posição de linha da grade.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "colunas",
            "description": "<p>Array contendo os dados das colunas da grade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "colunas.seq",
            "description": "<p>Posição da coluna de grade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "colunas.descricao",
            "description": "<p>Descrição da posição de coluna da grade.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n\n{\n   \"id\": \"00001\",\n   \"descricao\": \"CORES E TAMANHOS\",\n   \"descr_linha\": \"CORES\",\n   \"descr_coluna\": \"TAMANHO\",\n   \"linhas\": [\n     {\n       \"seq\": \"01\",\n       \"descricao\": \"BRANCA\"\n     },\n     {\n       \"seq\": \"02\",\n       \"descricao\": \"AZUL\"\n     },\n     {\n       \"seq\": \"03\",\n       \"descricao\": \"VERDE\"\n     }\n   ],\n   \"colunas\": [\n     {\n       \"seq\": \"01\",\n       \"descricao\": \"PEQUENO\"\n     },\n     {\n       \"seq\": \"02\",\n       \"descricao\": \"MEDIO\"\n     },\n     {\n       \"seq\": \"03\",\n       \"descricao\": \"GRANDE\"\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Produtos",
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
    "url": "/produtos/:id",
    "title": "Consultar produtos",
    "version": "1.0.0",
    "name": "getProdutos",
    "group": "Produtos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "codbar",
            "description": "<p>Código de barras do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "ref",
            "description": "<p>Referência do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "descr",
            "description": "<p>Descrição do produto. A resposta será um array de produtos.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "parcial",
            "description": "<p>Descrição parcial do produto. A resposta será um array de produtos.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Número da página para requisições que retornam um array de produtos.</p>"
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
            "description": "<p>ID (código) do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "compl_descr",
            "description": "<p>Complemento da descrição do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "especie",
            "description": "<p>Especie (P-Produto S-Serviço).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipo",
            "description": "<p>Tipo do produto (Q-Quantidade ou P-Pesável).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status do produto para venda (A-Ativo ou I-Inativo).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "referencia",
            "description": "<p>Código de referência do fornecedor do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cod_barras",
            "description": "<p>Código de barras do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cod_integ",
            "description": "<p>Código de integração do produto com outros aplicativos.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "marca",
            "description": "<p>Marca do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fabricante",
            "description": "<p>Fabricante do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "classificacao",
            "description": "<p>Grupo e subgrupo do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "familia",
            "description": "<p>ID da familia do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quant_emb",
            "description": "<p>Quantidade do produto na embalagem de venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "emb_fechada",
            "description": "<p>Indica se o produto é vendido somente com embalagem fechada.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unidade",
            "description": "<p>Unidade de venda do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "und_fracao",
            "description": "<p>Unidade de venda da fração do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "venda_fracao",
            "description": "<p>Indica se o produto pode ser vendido em unidades de fração.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quant_fracoes",
            "description": "<p>Quantidade de unidades de frações contidas na unidade de venda do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "peso_liquido",
            "description": "<p>Peso líquido do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "peso_bruto",
            "description": "<p>Peso bruto do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "desc_maximo",
            "description": "<p>Percentual máximo de desconto no preço de venda do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tabela_trib",
            "description": "<p>ID da tabela de tributação do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_loja",
            "description": "<p>ID da loja ou filial.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_loja",
            "description": "<p>Nome da loja ou filial.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "preco_venda",
            "description": "<p>Preço de venda da tabela padrão do produto na loja.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "preco_promocao",
            "description": "<p>Preço de promoção do produto na tabela padrão da loja.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_loja",
            "description": "<p>Saldo de estoque disponivel para venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_dep",
            "description": "<p>Saldo de estoque disponivel no depósito.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_loja_frc",
            "description": "<p>Saldo de estoque em frações disponivel na loja.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_dep_frc",
            "description": "<p>Saldo de estoque em frações disponível no depósito.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"id\": \"00001\",\n    \"descricao\": \"LEITE ITAMBE PLUS CXA C/20 UND\",\n    \"compl_descr\": \"\",\n    \"especie\": \"P\",\n    \"tipo\": \"Q\",\n    \"status\": \"A\",\n    \"referencia\": \"ABC-DEF-GHI-JKLM-NOP\",\n    \"cod_barras\": \"9788537909294\",\n    \"cod_integ\": \"1905\",\n    \"marca\": \"ITAMBE\",\n    \"fabricante\": \"ITAMBE\",\n    \"classificacao\": \"04001\",\n    \"familia\": \"003\",\n    \"quant_emb\": 10,\n    \"emb_fechada\": false,\n    \"unidade\": \"CXA\",\n    \"und_fracao\": \"PCT\",\n    \"venda_fracao\": false,\n    \"quant_fracoes\": 10,\n    \"peso_liquido\": 2.10,\n    \"peso_bruto\": 2.20,\n    \"desc_maximo\": 4.65,\n    \"tabela_trib\": \"01\",\n    \"id_loja\": \"00\",\n    \"nome_loja\": \"MATRIZ\",\n    \"preco_venda\": 152.25,\n    \"preco_promocao\": 0,\n    \"saldo_loja\": 262,\n    \"saldo_dep\": 35,\n    \"saldo_loja_frc\": 262,\n    \"saldo_dep_frc\": 35\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/produtos.js",
    "groupTitle": "Produtos",
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
    "url": "/produtos/:idprod/estoques/:idloja",
    "title": "Consultar saldo de estoque das lojas",
    "version": "1.0.0",
    "name": "getProdutosEstoques",
    "group": "Produtos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "optional": false,
            "field": "idprod",
            "description": "<p>ID (código) do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "idloja",
            "description": "<p>ID (código) da loja. Se não informado, a resposta da requisição será um array com os saldos de estoques de todas as lojas.</p>"
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
            "field": "id_loja",
            "description": "<p>ID da loja.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_loja",
            "description": "<p>Nome da loja.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_loja",
            "description": "<p>Saldo de estoque disponivel para venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_dep",
            "description": "<p>Saldo de estoque disponível no depósito.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_loja_frc",
            "description": "<p>Saldo de estoque da loja em unidade de frações.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_dep_frc",
            "description": "<p>Saldo de estoque do depósito em unidades de frações.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id_loja\": \"01\",\n  \"nome_loja\": \"PARAISO DAS CONSTRUÇÕES\",\n  \"saldo_loja\": 100,\n  \"saldo_dep\": 50,\n  \"saldo_loja_frc\": 1000,\n  \"saldo_dep_frc\": 500 \n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/produtos.js",
    "groupTitle": "Produtos",
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
    "url": "/produtos/:idprod/estoques/:idloja/grades/:posgrade",
    "title": "Consultar saldos de estoque de grades nas lojas",
    "version": "1.0.0",
    "name": "getProdutosEstoquesGrades",
    "group": "Produtos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "optional": false,
            "field": "idprod",
            "description": "<p>ID (código) do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idloja",
            "description": "<p>ID (código) da loja.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "posgrade",
            "description": "<p>Posição de linha e coluna da grade no formato 9999, sendo os 2 primeiros digitos para posição da linha e os dois restantes para posição da coluna. Se este parâmetro não for informado, a requisição retornará um array contendo os estoques de todas as posições da grade do produto.</p>"
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
            "field": "pos_grade",
            "description": "<p>Posição da grade no formato 9999.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descr_linha",
            "description": "<p>Descrição da linha da grade.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descr_coluna",
            "description": "<p>Descrição da coluna da grade, se houver.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_loja",
            "description": "<p>Saldo de estoque disponivel para venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_dep",
            "description": "<p>Saldo de estoque disponível no depósito.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_loja_frc",
            "description": "<p>Saldo de estoque da loja em unidade de frações.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "saldo_dep_frc",
            "description": "<p>Saldo de estoque do depósito em unidades de frações.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"pos_grade\": \"0102\",\n  \"descr_linha\": \"AMARELO\",\n  \"descr_coluna\": \"MEDIO\",\n  \"saldo_loja\": 100,\n  \"saldo_dep\": 50,\n  \"saldo_loja_frc\": 1000,\n  \"saldo_dep_frc\": 500 \n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/produtos.js",
    "groupTitle": "Produtos",
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
    "url": "/produtos/:idprod/precos/:idtab",
    "title": "Consultar as tabelas de preços de um produto",
    "version": "1.0.0",
    "name": "getProdutosTabPrecos",
    "group": "Produtos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "optional": false,
            "field": "idprod",
            "description": "<p>ID (código) do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "idtab",
            "description": "<p>ID (código) da tabela de preço. Quando não informado, a resposta será um array contendo os dados de todas as tabelas de preços do produto.</p>"
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
            "field": "id_tab_preco",
            "description": "<p>ID da tabela de preços.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_tab_preco",
            "description": "<p>Nome da tabela de preços.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "preco_venda",
            "description": "<p>Preço de venda do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "preco_promocao",
            "description": "<p>Preço de promoção do produto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id_tab_preco\": \"02\",\n  \"nome_tab_preco\": \"VENDA NO ATACADO\",\n  \"preco_venda\": 100,\n  \"preco_promocao\": 92.55,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/produtos.js",
    "groupTitle": "Produtos",
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
    "url": "/produtos/:idprod/precos/:idtab/planos/:idplano",
    "title": "Consultar os preços de um produto por plano de pagamento",
    "version": "1.0.0",
    "name": "getProdutosTabPrecosPlanosPag",
    "group": "Produtos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "optional": false,
            "field": "idprod",
            "description": "<p>ID (código) do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idtab",
            "description": "<p>ID (código) da tabela de preço.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "idplano",
            "description": "<p>ID (código) do plano de pagamento. Quando não informado, a resposta será um array contendo os preços de todos os planos de pagamento.</p>"
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
            "field": "id_plano_pag",
            "description": "<p>ID do plano de pagamento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_plano_pag",
            "description": "<p>Nome do plano de pagamento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "form_pag",
            "description": "<p>Forma de pagamento gerado pelo plano.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "preco_venda",
            "description": "<p>Preço venda do produto no plano.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id_plano_pag\": \"005\",\n  \"nome_plano_pag\": \"5x COM ENTRADA\",\n  \"forma_pag\": \"03\",\n  \"preco_venda\": 885,25\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/produtos.js",
    "groupTitle": "Produtos",
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
    "title": "Login de usuário na API",
    "name": "PostLogin",
    "group": "Usuarios",
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
    "groupTitle": "Usuarios"
  },
  {
    "type": "get",
    "url": "/usuarios/:id",
    "title": "Consultar usuários",
    "version": "1.0.0",
    "name": "getUsuarios",
    "group": "Usuarios",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do usuário. Quando não informado, a requisição retornará um array de usuários.</p>"
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
            "description": "<p>ID (código) do usuário.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do usuário.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id_nivel",
            "description": "<p>Nivel do usuário.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "lojas",
            "description": "<p>Array contendo a lista de lojas acessadas pelo usuário.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"JNS\",\n  \"nome\": \"JOSENILSON\",\n  \"id_nivel\": 1,\n  \"lojas\": [\"01\", \"02\", \"03\"]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Usuarios",
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
    "type": "delete",
    "url": "/venda-itens",
    "title": "Excluir todos os itens de uma venda",
    "version": "1.0.0",
    "name": "deleteVendas",
    "group": "Vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "optional": false,
            "field": "id_venda",
            "description": "<p>ID da venda a ser excluida.</p>"
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
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>true</code>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"sucesso\": true,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/vendas.js",
    "groupTitle": "Vendas",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>false</code>.</p>"
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
          "content": "HTTP/1.1 404 \n{\n  \"sucesso\": false,\n  \"message\": \"O ID 43 da venda não existe!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/venda-itens/:id",
    "title": "Excluir um produto da venda",
    "version": "1.0.0",
    "name": "deleteVendasItens",
    "group": "Vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "optional": false,
            "field": "id",
            "description": "<p>ID do item da venda a ser excluido.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_venda",
            "description": "<p>ID da venda.</p>"
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
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>true</code>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"sucesso\": true,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/vendas.js",
    "groupTitle": "Vendas",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>false</code>.</p>"
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
          "content": "HTTP/1.1 404 \n{\n  \"sucesso\": false,\n  \"message\": \"O ID 43 da venda não existe!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/formaspag/:id",
    "title": "Consultar Formas (meios) de pagamentos",
    "version": "1.0.0",
    "name": "getFormasPag",
    "group": "Vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
    "groupTitle": "Vendas",
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
    "url": "/opcomerciais/:id",
    "title": "Consultar operações comerciais",
    "version": "1.0.0",
    "name": "getOpComerciais",
    "group": "Vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) da operação. Quando não informado, a requisição retornará um array de operações comerciais.</p>"
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
            "description": "<p>ID (código) da operação.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição da operação.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descr_red",
            "description": "<p>Descrição reduzida (sigla).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipo_mov",
            "description": "<p>Tipo de movimento comercial (5-Venda).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mov_estoque",
            "description": "<p>Estoque a ser movimentado (L-Loja D-Depósito N-nenhum).</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "perc_desc_total",
            "description": "<p>Percentual de desconto máximo na venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "perc_desc_item",
            "description": "<p>Percentual de desconto máximo no item.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "perc_acres_item",
            "description": "<p>Percentual de acréscimo máximo no item.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"10\",\n  \"descricao\": \"VENDA DIRETA\",\n  \"descr_red\": \"VENDA\",\n  \"tipo_mov\": \"5\",\n  \"mov_estoque\": \"L\",\n  \"perc_desc_total\": 0,\n  \"perc_desc_item\": 10,\n  \"perc_acres_item\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Vendas",
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
    "url": "/parceiros/:id",
    "title": "Consultar parceiros",
    "version": "1.0.0",
    "name": "getParceiros",
    "group": "Vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do parceiro. Quando não informado, a requisição retornará um array de parceiros.</p>"
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
            "description": "<p>ID (código) do parceiro.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do parceiro.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "telefone",
            "description": "<p>Telefone do parceiro.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "celular",
            "description": "<p>Celular do parceiro.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "repasse",
            "description": "<p>Percentual de repasse do parceiro.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cnpj_cpf",
            "description": "<p>CNPJ ou CPF do parceiro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"00012\",\n  \"nome\": \"PAULO FRANCISCO FARIAS\",\n  \"telefone\": \"(88)9999-9999\",\n  \"celular\": \"(99)9999-9999\",\n  \"repasse\": 3.5,\n  \"cnpj_cpf\": \"12345678901\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Vendas",
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
    "url": "/planospag/:id",
    "title": "Consultar planos de pagamento",
    "version": "1.0.0",
    "name": "getPlanosPag",
    "group": "Vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) do plano. Quando não informado, a requisição retornará um array de planos de pagamentos.</p>"
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
            "description": "<p>ID (código) do plano.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do plano.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome_red",
            "description": "<p>Nome reduzido ou sigla do plano.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "forma_pag",
            "description": "<p>Forma de pagamento do plano. 00 a 09.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcelas",
            "description": "<p>Número de parcelas de pagamento a serem geradas.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "periodo",
            "description": "<p>Periodo entre parcelas. D-Dia ou M-Mês.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_nivel",
            "description": "<p>Nivel do usuário que pode usar o plano de pagamento numa venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "perc_desc_total",
            "description": "<p>Percentual máximo de desconto na venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "perc_desc_item",
            "description": "<p>Percentual máximo de desconto no item.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "perc_entrada",
            "description": "<p>Percentual mínimo para o valor de entrada na venda a prazo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "perc_acrescimo",
            "description": "<p>Percentual mínimo de acréscimo na venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "valor_minimo",
            "description": "<p>Valor mínimo da venda para o plano.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "desconto_auto",
            "description": "<p>Determina se o percentual de desconto será automático.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "acrescimo_auto",
            "description": "<p>Determina do o percentual de acréscimo será automático.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dias_atraso",
            "description": "<p>Número máximo de dias de atraso tolerado pelo plano.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "cheque_devol",
            "description": "<p>Determina se o plano de pagamento aceita cliente com cheque devolvido.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "promocao",
            "description": "<p>Determina se o plano aceita produtos em promoção.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tabelas",
            "description": "<p>Array contendo a lista de tabelas de preço permitidas no plano.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n   \"id\": \"001\",\n   \"nome\": \"A VISTA\",\n   \"nome_red\": \"A VISTA\",\n   \"forma_pag\": \"01\",\n   \"parcelas\": 0,\n   \"periodo\": \"D\",\n   \"id_nivel\": \"99\",\n   \"perc_desc_total\": 0,\n   \"perc_desc_item\": 10,\n   \"perc_entrada\": 0,\n   \"perc_acrescimo\": 0,\n   \"valor_minimo\": 0,\n   \"desconto_auto\": false,\n   \"acrescimo_auto\": false,\n   \"dias_atraso\": 0,\n   \"cheque_devol\": true,\n   \"promocao\": true,\n   \"tabelas\": [\"02\", \"03\"]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Vendas",
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
    "url": "/posprevendas/:id",
    "title": "Consultar posições de pré-vendas",
    "version": "1.0.0",
    "name": "getPosPreVendas",
    "group": "Vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "description": "<p>ID (código) da posição. Quando não informado, a requisição retornará um array de posições de pré-vendas.</p>"
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
            "description": "<p>ID (código) da posição.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição da posição.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "faturar",
            "description": "<p>Indica se a posição de pré-venda permite faturamento.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "alterar",
            "description": "<p>Indica se a posição de pré-venda permite alteração.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "cancelar",
            "description": "<p>Indica se a posição de pré-venda permite cancelamento.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"id\": \"01\",\n  \"nome\": \"SEPARAÇÃO\",\n  \"faturar\": false,\n  \"alterar\": false,\n  \"cancelar\": false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/cadastros.js",
    "groupTitle": "Vendas",
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
    "url": "/venda-itens",
    "title": "Incluir novo produto na venda",
    "version": "1.0.0",
    "name": "postVendaItens",
    "group": "Vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "field": "id_venda",
            "description": "<p>ID da venda. Se não for informado, será gerada uma nova venda.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_produto",
            "description": "<p>ID (código) do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "complemento",
            "description": "<p>Descrição complementar do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "posgrade",
            "description": "<p>Posição da grade do produto, se houver.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "fracionado",
            "description": "<p>Indica se o produto foi vendido em undidades fracionadas.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quantidade",
            "description": "<p>Quantidade vendida do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "preco",
            "description": "<p>Preço unitário do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pdesc",
            "description": "<p>Percentual de desconto concedido no produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "promocao",
            "description": "<p>Indica se o produto foi vendido com preço de promoção.</p>"
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
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>true</code>.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id_venda",
            "description": "<p>ID da venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id_item",
            "description": "<p>ID do item vendido.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vl_total",
            "description": "<p>Valor total do item vendido.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"sucesso\": true,\n  \"id_venda\": 13,\n  \"id_item\": 2,\n  \"vl_total\": 192.55,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/vendas.js",
    "groupTitle": "Vendas",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>false</code>.</p>"
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
          "content": "HTTP/1.1 404 \n{\n  \"sucesso\": false,\n  \"message\": \"O ID 43 da venda não existe!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/venda-itens/:id",
    "title": "Alterar um produto na venda",
    "version": "1.0.0",
    "name": "putVendasItens",
    "group": "Vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "optional": false,
            "field": "id",
            "description": "<p>ID do item da venda a ser alterado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_venda",
            "description": "<p>ID da venda.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_produto",
            "description": "<p>ID (código) do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "complemento",
            "description": "<p>Descrição complementar do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "posgrade",
            "description": "<p>Posição da grade do produto, se houver.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "fracionado",
            "description": "<p>Indica se o produto foi vendido em undidades fracionadas.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quantidade",
            "description": "<p>Quantidade vendida do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "preco",
            "description": "<p>Preço unitário do produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pdesc",
            "description": "<p>Percentual de desconto concedido no produto.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "promocao",
            "description": "<p>Indica se o produto foi vendido com preço de promoção.</p>"
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
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>true</code>.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id_venda",
            "description": "<p>ID da venda.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id_item",
            "description": "<p>ID do item alterado.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vl_total",
            "description": "<p>Valor total do item alterado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"sucesso\": true,\n  \"id_venda\": 13,\n  \"id_item\": 2,\n  \"vl_total\": 192.55,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/vendas.js",
    "groupTitle": "Vendas",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>false</code>.</p>"
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
          "content": "HTTP/1.1 404 \n{\n  \"sucesso\": false,\n  \"message\": \"O ID 43 da venda não existe!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/venda-itens/precos",
    "title": "Alterar a tabela de preço dos itens da venda",
    "version": "1.0.0",
    "name": "putVendasItensPrecos",
    "group": "Vendas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>'Bearer ' + Token obtido no login do usuário.</p>"
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
            "optional": false,
            "field": "id_venda",
            "description": "<p>ID da venda.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_tab_preco",
            "description": "<p>ID (código) da nova tabela de preços.</p>"
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
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>true</code>.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "vl_total",
            "description": "<p>Valor total dos itens da venda atualizados conforme a nova tabela de preços.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": " HTTP/1.1 200 OK\n{\n  \"sucesso\": true,\n  \"vl_total\": 1278.65,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/cadastros/vendas.js",
    "groupTitle": "Vendas",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "sucesso",
            "description": "<p>Retorna sempre <code>false</code>.</p>"
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
          "content": "HTTP/1.1 404 \n{\n  \"sucesso\": false,\n  \"message\": \"O ID 43 da venda não existe!\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
