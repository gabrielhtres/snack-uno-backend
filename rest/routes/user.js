const { table } = require('console')
const express = require('express')
const router = express.Router() //router 
const database = require('../db')

router.post('/signup', (req, res, next) => {
    (async () => {
        console.log(req.body)
        req = await database.createUser(req.body)
        res.status(req).send({
            message: req
        })
    })()
})

router.post('/login', (req, res, next) => {
    (async () => {
        req = await database.loginUser(req.body)
        res.status(200).send({
            message: req
        })
    })()
})

module.exports = router