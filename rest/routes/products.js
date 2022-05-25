const express = require('express')
const router = express.Router() 
const database = require('../db')

// Pronto
router.get('/', (req, res, next) => {
    (async () => {
        req = await database.getTable('product')
        res.status(200).send({
            message: req
        })
    })()
})

// Pronto
router.get('/:id_product', (req, res, next) => {
    (async () => {
        req = await database.getTableByID('product', req.params.id_product)
        res.status(200).send({
            message: req
        })
    })()
})

//pronto
router.post('/', (req, res, next) => {
    (async () => {
        req = await database.insertProduct(req.body)
        res.status(200).send({
            message: req
        })
    })()
})

// Pronto
router.delete('/:id_product', (req, res, next ) => {
    (async () => {
        req = await database.deleteProducts(req.params.id_product)
        res.status(200).send({
            message: 'Produto deletado com sucesso'
        })
    })()
})

module.exports = router