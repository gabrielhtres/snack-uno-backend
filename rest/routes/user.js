const { table } = require('console')
const express = require('express')
const router = express.Router() //router 
const database = require('../db')

router.post('/signup', (req, res, next) => {
    (async () => {
        console.log(req.body)
        req = await database.createUser(req.body)
        res.status(200).send({
            message: 'Usuario criado com sucesso'
        })
    })()
})

router.post('/login', (req, res, next) => {
    (async () => {
        req = await database.loginUser(req.body)
        login = ''
        if (req) { 
            login = 'Login realizado com sucesso'
            console.log(login)
        }
        else {
            login = 'Login ou senha incorretos'
            console.log(login)
        }
        res.status(200).send({
            message: login
        })
    })()
})

module.exports = router