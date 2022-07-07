const { query } = require('express');
const { default: knex } = require('knex');
const Client = require('pg')
const dbconfig = require ('./nodemon.json')

const pool = new Client.Pool({ 
    user: dbconfig.env.DB_USER,
    password: dbconfig.env.DB_PASSWORD,
    database: dbconfig.env.DB_DATABASE,
    host: dbconfig.env.DB_HOST,
    port: dbconfig.env.DB_PORT
})

module.exports = {insertProduct, deleteProducts, getTable, getTableByID, getUserLogin, insertUser, insertRestaurant, 
    deleteRestaurants, getProductsByRestaurantId, alterUser, getUserById, deleteRequests, insertRequest}

/////////////////////////////////////////////////////////////////////////////////////////////////////

async function getTable(table) 
{
    console.log('\nStarting connection with database...')
    await pool.connect()
    console.log('Connection sucessful!')
    let query = await pool.query(`SELECT * FROM ${table}`)
    return query.rows
}

// rota que procura todos produtos pelo id do restaurante
async function getProductsByRestaurantId(id_restaurant)
{
    console.log('\nStarting connection with database...')
    await pool.connect()
    console.log('Connection sucessful!')
    const sql = `select p.* from product as p
    inner join restaurant as r on (p.id_restaurant = r.id_restaurant) where p.id_restaurant = $1;`
    let query = await pool.query(sql, [id_restaurant])
    return query.rows 
}

async function getTableByID(table, id) 
{
    console.log('\nStarting connection with database...')
    await pool.connect()
    console.log('Connection sucessful!')
    let query = await pool.query(`SELECT * FROM ${table} WHERE id_${table} = $1`, [id])
    return query.rows
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////

async function insertProduct(product) 
{
    console.log('\nStarting connection with database...')
    await pool.connect()
    console.log('Conection sucessful!')
    let {name, price, description, flavor, image, id_restaurant, stock} = product
    let sql = `INSERT INTO product (name, price, description, flavor, image, id_restaurant, stock) VALUES ($1, $2, $3, $4, $5, $6, $7);`
    let query = await pool.query(sql, [name, price, description, flavor, image, id_restaurant, stock])
    return query.rowCount == 1;
}

async function insertRestaurant(restaurant) 
{
    console.log('\nStarting connection with database...')
    await pool.connect()
    console.log('Connection sucessful!')
    let {nameRestaurant, localization, openClose, delivery, priceDelivery} = restaurant
    let sql = `INSERT INTO restaurant (nameRestaurant, localization, openClose, delivery, priceDelivery) VALUES ($1, $2, $3, $4, $5);`
    let query = await pool.query(sql, [nameRestaurant, localization, openClose, delivery, priceDelivery])
    return query.rowCount == 1;
}

async function insertRequest(request)
{
    await pool.connect()
    console.log('Connection sucessful!')
    let {totalPrice, data, status_request, id_user} = request
    let sql = `INSERT INTO request (totalPrice, data, status_request, id_user) VALUES ($1, $2, $3, $4);`
    let query = await pool.query(sql, [totalPrice, data, status_request, id_user])
    return query.rowCount == 1;
}

//////////////////////////////////////////////////////////////////////////////////////////

async function deleteProducts(id_product) 
{
    console.log('\nStarting connection with database...')
    await pool.connect()
    console.log('Connection sucessful!')
    let query = await pool.query(`DELETE FROM product WHERE id_product = $1`, [id_product])
    console.table('Data deleted from products')
    return query.rowCount == 1
}

async function deleteRestaurants(id_restaurant) 
{
    console.log('\nStarting connection with database...')
    await pool.connect()
    console.log('Connection sucessful!')
    let query = await pool.query(`DELETE FROM restaurant WHERE id_restaurant = $1`, [id_restaurant])
    return query.rowCount == 1
}

async function deleteRequests(id_request)
{
    await pool.connect()
    console.log('Connection sucessful!')
    let sql = `DELETE FROM request WHERE id_request = $1`
    let query = await pool.query(sql, [id_request])
    return query.rowCount == 1
}
/////////////////////////////////////////////////////////////////////////////////////////////////

async function getUserLogin(params)
{
    await pool.connect()
    console.log('Connection sucessful!')
    let sql = `SELECT * FROM users WHERE email = $1`
    let user = await pool.query(sql, [params.email])
    return user.rows[0]
} 

async function insertUser(params)
{
    await pool.connect()
    console.log('\nConnection sucessful!')
    let {name, cpf, data_birth, telephone, email, password} = params
    let sql = `INSERT INTO users (name, cpf, data_birth, telephone, email, password) VALUES ($1, $2, $3, $4, $5, $6);`
    await pool.query(sql, [name, cpf, data_birth, telephone, email, password])
}

async function getUserById(id)
{
    await pool.connect()
    console.log('Connection sucessful!')
    let sql = `SELECT * FROM users WHERE id_user = $1`
    let user = await pool.query(sql, [id])
    return user.rows;
}

async function alterUser(user)
{
    let fields = [];
    Object.keys(user).forEach(campo => fields.push(`${campo} = '${user[campo]}'`));
    fields = fields.join(', ');
    const sql = `update users set ${fields} where id_user = ${user.id_user};`;
    await pool.connect()
    console.log('\nConnection sucessful!')
    console.log(sql);
    await pool.query(sql)
    return 1;
}
