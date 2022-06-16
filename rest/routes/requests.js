const express = require('express')
const router = express.Router() 
const database = require('../db')

router.get('/', (req, res, next) => {
    (async () => {
        req = await database.getTable('request')
        res.status(200).send({
            message: req
        })
    })()
})

// Pronto
router.get('/:id_request', (req, res, next) => {
    (async () => {
        req = await database.getTableByID('request', req.params.id_request)
        res.status(200).send({
            message: req
        })
    })()
})


router.post('/', (req, res, next) => {
    (async () => {
        req = await database.insertRequest(req.body)
        res.status(200).send({
            message: req
        })
    })()
})

// Pronto
router.delete('/:id_request', (req, res, next ) => {
    (async () => {
        req = await database.deleteProducts(req.params.id_request)
        res.status(200).send({
            message: 'Pedido deletado com sucesso'
        })
    })()
})

module.exports = router