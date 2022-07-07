const express = require('express')
const router = express.Router() 
const database = require('../db')

router.get('/', async (req, res, next) => {
    try {
        let requests = await database.getTable('request')
        res.status(200).send(requests)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Pronto
router.get('/:id_request', async (req, res, next) => {
    try {
        let request = await database.getTableByID('request', req.params.id_request)
        res.status(200).send(request)
    } catch (error) {
        res.status(500).send(error)
    } 
})

router.post('/', async (req, res, next) => {
    try {
        let inserido = await database.insertRequest(req.body)
        let msg = inserido ? 'Pedido inserido com sucesso!' : 'Erro ao inserir pedido!'
        res.status(201).send(msg)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Pronto
router.delete('/:id_request', async (req, res, next ) => {
    try {
        let deletado = await database.deleteRequests(req.params.id_request)
        let msg = deletado 
            ? `Pedido ${req.params.id_request} deletado com sucesso` 
            : `Nao foi encontrado nenhum pedido com o id ${req.params.id_request} para ser deletado`;
        res.status(200).send({ msg });
    } catch (error) {
        res.status(500).send({ error });
    }
})

module.exports = router