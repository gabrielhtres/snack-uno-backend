const express = require('express')
const router = express.Router() //router 
const {createUser, loginUser} = require('../db')

router.post('/register', (req, res, next) => {
    (async () => {
        console.log(req.body)
        req = await createUser(req.body)
        res.status(200).send({
            message: 'Usuario criado com sucesso'
        })
    })()
})

module.exports = router