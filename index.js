const express= require('express')
const bodyParser = require('body-parser')
const consign = require('consign')
const dotEnv = require('dotenv-safe')
const morgan = require('morgan')
const utils = require('./utils/utils')
const cors = require('cors')
    
dotEnv.config({ allowEmptyValues: true})

const app = express()
app.use(cors())

app.set('path-api', '/api/v1')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))
app.use(express.static('doc')) 

consign().include('routes/login.js').then('routes/cadastros').into(app)

app.use(utils.routeNotFound)
app.use(utils.handlerError)

port = process.env.SRV_PORT || 3000;
app.listen(port, () => {
  console.log('Servidor rodando na porta '+port)
})
