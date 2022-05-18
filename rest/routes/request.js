const express = require('express')
const router = express.Router() //router é um middleware que permite que eu crie rotas

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Get request ok!'
    })
})

router.post('/', (req, res, next) => {
    const request = {
        id_product: req.body.id_product,
        quantity: req.body.quantity,   
    }
    res.status(201).send({
        message: 'Pedido adicionado com sucesso!',
        createRequest: request
    })
})

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    res.status(200).send({
        message: 'Get com id ok!',
        id_pedido: id
    })
})

router.delete('/', (req, res, next ) => {
    res.status(201).send({
        message: 'Delete request ok!'
    })
})

module.exports = router