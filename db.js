const { query } = require('express');
const { default: knex } = require('knex');
const Client = require('pg')
const dbconfig = require ('./nodemon.json')

let res = ''

const pool = new Client.Pool(
    { user: dbconfig.env.DB_USER,
    password: dbconfig.env.DB_PASSWORD,
    database: dbconfig.env.DB_DATABASE,
    host: dbconfig.env.DB_HOST,
    port: dbconfig.env.DB_PORT}
)

// const client = new Client.Client({
//     user: dbconfig.env.DB_USER,
//     password: dbconfig.env.DB_PASSWORD,
//     database: dbconfig.env.DB_DATABASE,
//     host: dbconfig.env.DB_HOST,
//     port: dbconfig.env.DB_PORT
// })

module.exports = {getAllProducts, insertProduct, deleteProducts, getProductid}

/////////////////////////////////////////////////////////////////////////////////////////////////////

async function getAllProducts() {
    try {
        console.log('Starting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        res = await pool.query("SELECT * FROM products")
        console.table(res.rows)
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getProductid(id_product) {
    try {
        console.log('Starting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        res = await pool.query(`SELECT * FROM products where id_product = ${id_product}`)
        console.table(res.rows) 
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////

async function insertProduct(name, price, description, image, stock) {
    try {
        console.log('Starting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        data = `INSERT INTO products(name, price, description, image, stock) VALUES ('${name}', ${price}, '${description}', '${image}', ${stock})`
        pool.query(data)
        console.table('Dados inseridos na tabela products')
        console.log(getAllProducts())
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }
}

// ///////////////////////////////////////////////////////////////////////////////////////////

async function deleteProducts(id_product) {
    try {
        console.log('Starting connection with database...')
        await pool.connect()
        queryC = `DELETE FROM products WHERE id_product = ${id_product}`
        console.log('Connection sucessful!')
        await pool.query(queryC)
        console.table('Data deleted from products')
        console.log(getAllProducts())
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }   
}
      
///////////////////////////////////////////////////////////////////////////////////////////

