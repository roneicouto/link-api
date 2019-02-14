const createError = require('http-errors')
const crypto = require('crypto')
const moment = require('moment')
const CPF = require('cpf')
const CNPJ = require('cnpj')

exports.routeNotFound = (req, res) => {
  throw new createError.NotFound('URL (' + req.path + ') ou método (' + req.method + ') inexistente!')
}

exports.handlerError = (err, req, res, next) => {
  if (err instanceof createError.HttpError) {
    return res.status(err.statusCode).json(err)
  }
  res.status(err.status || 500).send(err.message)
}

exports.md5 = (text) => {
  return crypto.createHash('md5').update(text).digest('hex')
}

exports.fNumber = (number, dec = 2) => {
  let strval = number.toFixed(dec).split('.');
  strval[0] = strval[0].split(/(?=(?:...)*$)/).join('.');
  return strval.join(',');
}

exports.fCurrency = (number, dec = 2) => {
  return 'R$ ' + exports.fNumber(number, dec)
}

exports.fPercent = (number, dec = 2) => {
  return number.toFixed(dec)+'%'
}

exports.roundVal = (value, decimals = 2) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

exports.truncateVal = (value, decimals = 2) => {
  return Number(Math.trunc(value + 'e' + decimals) + 'e-' + decimals)  
}

exports.daysBetween = (initDate, finalDate = Date.now()) => {
  return moment(finalDate).diff(initDate, 'days')
}

exports.isEmptyObject = obj => {
  for (let p in obj) return false
  return true
 }

exports.cpfValido = numCPF => {
  return numCPF && /^\d{11}$/.test(numCPF) && CPF.isValid(numCPF)
}

exports.cnpjValido = numCNPJ => {
  return numCNPJ && /^\d{14}$/.test(numCNPJ) && CNPJ.validate(numCNPJ)
}
