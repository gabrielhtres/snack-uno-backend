const express = require('express')
const router = express.Router() 
const database = require('../db')
const jwtAuth = require('../middleware/jwtAuth')

// Pronto
router.get('/', async (req, res, next) => {
    try {
        let products = await database.getTable('product')
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Pronto
router.get('/:id_product', async (req, res, next) => {
    try {
        let product = await database.getTableByID('product', req.params.id_product)
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(error)
    } 
})

//pronto
router.post('/', async (req, res, next) => {
    try {
        let inserido = await database.insertProduct(req.body)
        let msg = inserido ? 'Produto inserido com sucesso!' : 'Erro ao inserir produto!'
        res.status(201).send(msg)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Pronto
router.delete('/:id_product', async (req, res, next ) => {
    try {
        let deletado = await database.deleteProducts(req.params.id_product)
        let msg = deletado 
            ? `Produto ${req.params.id_product} deletado com sucesso` 
            : `Nao foi encontrado nenhum produto com o id ${req.params.id_product} para ser deletado`;
        res.status(200).send({ msg });
    } catch (error) {
        res.status(500).send({ error });
    }
})

module.exports = router