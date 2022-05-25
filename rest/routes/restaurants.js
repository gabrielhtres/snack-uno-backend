const console = require('console')
const express = require('express')
const router = express.Router()
const {getTable} = require('../db')

router.get('/', (req, res, next) => {
    (async () => {
        console.log("PEga todos os produtos")
        req = await getTable('products')
        res.status(200).send({
            message: req
        })
    })()
})