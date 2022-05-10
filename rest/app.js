const express = require('express') 
const app = express() //criando uma instancia do express

app.use((req, res, next) => {
    res.status(200).send({
        message: 'Tudo certo por aqui amigo!'
    })
})

module.exports = app //deixando o app disponível para outros arquivos