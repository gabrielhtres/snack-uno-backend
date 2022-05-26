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
        if(req){
            res.status(200).send({
                message: 'Usuario logado com sucesso'
            })
        }else{
            res.status(401).send({
                message: 'Usuario não encontrado'
            })
        }
    })()
})

module.exports = router