const express = require('express')
const router = express.Router() 
const {insertProduct, getAllProducts, deleteProducts, getProductid} = require('../db')

// Pronto
router.get('/', (req, res, next) => {
    (async () => {
        req = await getAllProducts()
        res.status(200).send({
            message: req
        })
    })()
})

// Pronto
router.get('/:id_product', (req, res, next) => {
    (async () => {
        req = await getProductid(req.params.id_product)
        res.status(200).send({
            message: req
        })
    })()
})

//pronto
router.post('/', (req, res, next) => {
    (async () => {
        console.log(req.body)
        req = await insertProduct(req.body)
        res.status(200).send({
            message: req
        })
    })()
})

// Pronto
router.delete('/:id_product', (req, res, next ) => {
    (async () => {
        req = await deleteProducts(req.params.id_product)
        res.status(200).send({
            message: 'Produto deletado com sucesso'
        })
    })()
})

module.exports = router