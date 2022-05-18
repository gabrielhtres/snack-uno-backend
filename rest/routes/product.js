const console = require('console')
const express = require('express')
const router = express.Router() //router 
const {sendProducts, getAllProducts} = require('../db')

// Pronto
router.get('/', (req, res, next) => {
    (async () => {
        req = await getAllProducts()
        res.status(200).send({
            message: req
        })
    })()
})

router.get('/:id_product', (req, res, next) => {
    (async () => {
        req = await getAllProducts()
        res.status(200).send({
            message: req
        })
    })()
})

router.post('/', (req, res, next) => {
    (async () => {
        req = await sendProducts("Galinha preta", "14.00")
        res.status(200).send({
            message: req
        })
    })()
})

router.delete('/', (req, res, next ) => {
    res.status(201).send({
        message: 'Delete product ok!'
    })
})

module.exports = router