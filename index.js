const express= require('express')
const bodyParser = require('body-parser')
const consign = require('consign')
const dotEnv = require('dotenv-safe')
const morgan = require('morgan')
const utils = require('./utils/utils')

dotEnv.config({ allowEmptyValues: true})

const app = express()

app.set('path-api', '/api/v1')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))

consign().include('routes/login.js').then('routes/cadastros').into(app)

app.use(utils.routeNotFound)
app.use(utils.handlerError)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
