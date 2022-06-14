const { table } = require('console')
const express = require('express')
const router = express.Router() //router 
const login = require('../auth/login')
const signup = require('../auth/signup')

router.post('/signup', (req, res, next) => {
    (async () => {
        console.log(req.body)
        req = await signup.createUser(req.body)
        res.status(req).send({
            message: req
        })
    })()
})

router.post('/login', (req, res, next) => {
    (async () => {
        req = await login.loginUser(req.body)
        res.status(req).send({
            message: req
        })
    })()
})

module.exports = router