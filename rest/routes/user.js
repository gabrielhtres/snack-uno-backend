const { table } = require('console')
const express = require('express')
const router = express.Router() //router 
const {createUser} = require('../db')

router.post('/signup', (req, res, next) => {
    (async () => {
        console.log(req.body)
        req = await createUser(req.body)
        res.status(200).send({
            message: 'Usuario criado com sucesso'
        })
    })()
})

router.post('/login', (req, res, next) => {
    
})

module.exports = router