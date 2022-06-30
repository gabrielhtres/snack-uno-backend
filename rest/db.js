const { query } = require('express');
const { default: knex } = require('knex');
const Client = require('pg')
const dbconfig = require ('./nodemon.json')

let res = ''

const pool = new Client.Pool({ 
    user: dbconfig.env.DB_USER,
    password: dbconfig.env.DB_PASSWORD,
    database: dbconfig.env.DB_DATABASE,
    host: dbconfig.env.DB_HOST,
    port: dbconfig.env.DB_PORT
})

module.exports = {insertProduct, deleteProducts, getTable, getTableByID, getUser, insertUser, insertRestaurant, deleteRestaurants, getProductsByRestaurantId}

/////////////////////////////////////////////////////////////////////////////////////////////////////

async function getTable(table) {
    try {
        console.log('\nStarting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        res = await pool.query(`SELECT * FROM ${table}`)
        console.table(res.rows)
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }
}

// rota que procure todos produtos pelo id do restaurante
async function getProductsByRestaurantId(id_restaurant)
{
    try {
        console.log('\nStarting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        res = await pool.query(`select p.* from product as p
        inner join restaurant as r on (p.id_restaurant = r.id_restaurant) where p.id_restaurant = $1`, [id_restaurant])
        console.table(res.rows)
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }
}


async function getTableByID(table, id) {
    try {
        console.log('\nStarting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        res = await pool.query(`SELECT * FROM ${table} WHERE id_${table} = $1`, [id])
        console.table(res.rows)
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////

async function insertProduct(product) {
    try {
        console.log('\nStarting connection with database...')
        await pool.connect()
        console.log('ConngetTableByIDection sucessful!')
        data = `INSERT INTO product (name, price, description, flavor, image, id_restaurant, stock) VALUES (
            '${product.name}', ${product.price}, '${product.description}', '{${product.flavor}}',
            '${product.image}', ${product.id_restaurant}, ${product.stock}
        )`
        await pool.query(data)
    }catch (error) {
        console.log(error)
    }
    finally{
        console.table('Dados inseridos na tabela product')
        return await getTable('product')
    } 
}

async function insertRestaurant(restaurant) {
    try {
        console.log('\nStarting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        let data = `INSERT INTO restaurant (nameRestaurant, localization, openClose, delivery, priceDelivery) VALUES (
            '${restaurant.nameRestaurant}', ${restaurant.localization}, '${restaurant.openClose}', '{${restaurant.delivery}}',
            '${restaurant.priceDelivery}'
        )`
        await pool.query(data)
    }catch (error) {
        console.log(error)
    }
    finally{
        console.table('Dados inseridos na tabela restaurant')
        return await getTable('restaurant')
    } 
}


//////////////////////////////////////////////////////////////////////////////////////////

async function deleteProducts(id_product) {
    try {
        console.log('\nStarting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        await pool.query(`DELETE FROM product WHERE id_product = $1`, [id_product])
        console.table('Data deleted from products')
        console.log(getTable('product'))
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }   
}

async function deleteRestaurants(id_restaurant) {
    try {
        console.log('\nStarting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        await pool.query(`DELETE FROM restaurant WHERE id_restaurant = $1`, [id_restaurant])
        console.table('Data deleted from restaurant')
        console.log(getTable('restaurant'))
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }   
}

/////////////////////////////////////////////////////////////////////////////////////////////////

async function getUser(user){
    try {
        await pool.connect()
        console.log('Connection sucessful!')
        res = await pool.query(`SELECT * FROM users WHERE email = '${user.email}'`)
        console.table(res.rows)
        return res.rows[0]
    }catch (error) {
        console.log(error)
    }
} 

async function insertUser(user){
    try {
        await pool.connect()
        console.log('\nConnection sucessful!')
        await pool.query(`INSERT INTO users (name, cpf, data_birth, telephone, email, password) VALUES 
        ('${user.name}', '${user.cpf}', '${user.data_birth}', '${user.telephone}', '${user.email}', '${hash}')`)
        return 201
    }catch (error) {
        console.log(error)
        return 500
    }
}
