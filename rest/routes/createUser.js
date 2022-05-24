const express = require('express')
const router = express.Router() //router 
const {createUser} = require('../db')

router.post('/register', (req, res, next) => {
    (async () => {
        req = await createUser(req.body)
        res.status(200).send({
            message: 'Usuário criado com sucesso'
        })
    })()
})

module.exports = router