const express = require('express')
const router = express.Router() //router é um middleware que permite que eu crie rotas
const db = require('../db')

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Get product ok!'
    })
})

router.get('/:id_product', (req, res, next) => {
    const id = req.params.id_product
    res.status(200).send({
        message: 'Get com id product ok!',
        id_product: id
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        message: 'Post product ok!',
    })
})

router.delete('/', (req, res, next ) => {
    res.status(201).send({
        message: 'Delete product ok!'
    })
})

module.exports = router