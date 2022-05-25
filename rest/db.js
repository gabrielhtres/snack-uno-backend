const { query } = require('express');
const { default: knex } = require('knex');
const Client = require('pg')
const dbconfig = require ('./nodemon.json')
const bcrypt = require('bcrypt')

let res = ''

const pool = new Client.Pool(
    { 
    user: dbconfig.env.DB_USER,
    password: dbconfig.env.DB_PASSWORD,
    database: dbconfig.env.DB_DATABASE,
    host: dbconfig.env.DB_HOST,
    port: dbconfig.env.DB_PORT
    }
)

module.exports = {getAllProducts, insertProduct, deleteProducts, getProductid, createUser, loginUser}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////PRODUCTS////////////////////////////////////////////////////////////

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
        res = await pool.query(`SELECT * FROM products WHERE id_product = $1`, [id_product])
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
        console.log('Starting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        data = `INSERT INTO products (name, price, description, image, id_restaurant, stock) VALUES (
            '${product.name}', '${product.price}', '${product.description}', '${product.image}', '${product.id_restaurant}', '${product.stock}'
        )`
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

//////////////////////////////////////////////////////////////////////////////////////////

async function deleteProducts(id_product) {
    try {
        console.log('Starting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        await pool.query(`DELETE FROM products WHERE id_product = $1`, [id_product])
        console.table('Data deleted from products')
        console.log(getAllProducts())
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }   
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////USERS////////////////////////////////////////////////////     

async function createUser(user) {
    try {
        if (user == null) {
            return
        }
        console.log('Starting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        bcrypt.hash(user.password, 10, async (err, hash) => {
            if (err) {
                return console.log(err)
            }
            await pool.query(`INSERT INTO users (email, pass) VALUES ('${user.email}', '${hash}')`)
            console.table('Dados inseridos na tabela users')
        });
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

async function loginUser(user) {
    try {
        console.log('Starting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        res = await pool.query(`SELECT * FROM users WHERE email = '${user.email}'`)
        console.table(res.rows)
        if (res.rows.length == 0) {
            return false
        }
        bcrypt.compare(user.password, res.rows[0].pass, (err, result) => {
            if (err) {
                return console.log(err)
            }
            if (result) {
                return true
            }
            return false
        })
    }catch (error) {
        console.log(error)
    }
    finally{
        return await res.rows
    }
}

///////////////////////////////////////////////////////////////////////////////////////////