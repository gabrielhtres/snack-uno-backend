const express = require('express') 
const app = express() //criando uma instancia do express
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routeProducts = require('./routes/products') 
const routeRestaurants = require('./routes/restaurants')
const routeCreateUser = require('./routes/users') 
const requests = require('./routes/requests')
const requestProducts = require('./routes/requestProducts')
const cors = require('cors')

app.use(morgan('dev')) //para fazer o log das requisicoes
app.use(bodyParser.urlencoded ({ extended: false })) //para fazer apenas requisicoes com dados simples  
app.use(bodyParser.json()) //aceita apenas json
app.use(cors())

app.use('/products', routeProducts) //rota para produtos
app.use('/restaurants', routeRestaurants) //rota para restaurantes
app.use('/users', routeCreateUser) //rota para criar usuario
app.use('/requests', requests) //rota para requisicoes
app.use('/requestProducts', requestProducts) //rota para pedidos

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
