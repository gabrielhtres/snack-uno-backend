const express = require('express')
const router = express.Router() //router é um middleware que permite que eu crie rotas

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Get request ok!'
        })
})

router.post('/', (req, res, next) => {
    const product = {
        nome: req.body.nome,
        preco: req.body.preco
    }
    res.status(201).send({
        message: 'Produto adicionado com sucesso!',
    })
})

router.get('/:id_product', (req, res, next) => {
    const id = req.params.id_product
    res.status(200).send({
        message: 'Get com id ok!',
        id: id
    })
})

router.patch('/', (req, res, next) => {
    res.status(201).send({
        message: 'Patch request ok!'
    })
})

router.delete('/', (req, res, next ) => {
    res.status(201).send({
        message: 'Delete request ok!'
    })
})

module.exports = router