const express = require('express') 
const app = express() //criando uma instancia do express
const morgan = require('morgan')
const bodyParser = require('body-parser')

const routeProducts = require('./routes/product') 
const routeRequest = require('./routes/request') 

app.use(morgan('dev')) //para fazer o log das requisicoes
app.use(bodyParser.urlencoded ({ extended: false })) //para fazer apenas requisicoes com dados simples  
app.use(bodyParser.json()) //aceita apenas json

app.use('/products', routeProducts) //rota para produtos
app.use('/requests', routeRequest) //rota para acessar o arquivo product.js

app.use((req, res, next) => { //caso nenhuma rota seja estabelecida
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        error: {
            message: error.message
        }
    })
})

module.exports = app //deixando o app disponível para outros arquivos