const express = require('express')
const router = express.Router()
const database = require('../db')

router.get('/', async (req, res, next) => {
    try {
        let restaurants = await database.getTable('restaurant')
        res.status(200).send(restaurants)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id_restaurant', async (req, res, next) => {
    try {
        let restaurant = await database.getTableByID('restaurant', req.params.id_restaurant)
        res.status(200).send(restaurant)
    } catch (error) {
        res.status(500).send(error)
    }  
})

router.post('/', async (req, res, next) => {
    try {
        let inserido = await database.insertRestaurant(req.body)
        let msg = inserido ? 'Restaurante inserido com sucesso!' : 'Erro ao inserir restaurante!'
        res.status(201).send(msg)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Pronto
router.delete('/:id_restaurant', async (req, res, next ) => {
    try {
        let deletado = await database.deleteRestaurants(req.params.id_restaurant)
        let msg = deletado 
            ? `Restaurante ${req.params.id_restaurant} deletado com sucesso` 
            : `Nao foi encontrado nenhum restaurante com o id ${req.params.id_restaurant} para ser deletado`;
        res.status(200).send({ msg });
        
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/restaurant_product/:id_restaurant', async (req, res, next) => {
    try {
        let products = await database.getProductsByRestaurantId(req.params.id_restaurant)
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router