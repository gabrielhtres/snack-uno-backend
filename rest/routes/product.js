const console = require('console')
const express = require('express')
const router = express.Router() //router 
const {insertProduct, getAllProducts, deleteProducts} = require('../db')

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

// Pronto
router.post('/', (req, res, next) => {
    (async () => {
        req = await insertProduct("pizza", 10, "pizza de calabresa", "https://www.pizzahut.com.br/assets/img/pizzas/pizza-calabresa.png", 10)
        res.status(200).send({
            message: req
        })
    })()
})

// Pronto
router.delete('/', (req, res, next ) => {
    (async () => {
        req = await deleteProducts(12)
        res.status(200).send({
            message: req
        })
    })()
})

module.exports = router