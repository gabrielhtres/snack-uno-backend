const express = require('express')
const router = express.Router() //router 
const login = require('../auth/login')
const signup = require('../auth/signup')
const database = require('../db')

router.post('/signup', async (req, res, next) => {
    try {
        await signup.createUser(req.body)
        res.status(200).send('Usuario criado com sucesso')
    } catch (error) {
        res.status(500).send('Erro ao criar usuario')
    }
})

router.post('/login', async (req, res, next) => {
    try {
        let user = await login.loginUser(req.body)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send('Erro ao logar usuario')
    }
})

router.patch('/alterUser', async (req, res, next) => {
    try {
        const user = await database.alterUser(req.body)
        res.status(200).send('Usuario alterado com sucesso')
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id_user', async (req, res, next) => {
    try {
        const user = await database.getUserById(req.params.id_user)
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router