const express = require('express')
const router = express.Router()
const database = require('../db')

router.get('/', (req, res, next) => {
    (async () => {
        req = await database.getTable('restaurant')
        res.status(200).send({
            message: req
        })
    })()
})

router.get('/:id_restaurant', (req, res, next) => {
    (async () => {
        req = await database.getTableByID('restaurant', req.params.id_restaurant)
        res.status(200).send({
            message: req
        })
    })()
})

module.exports = router