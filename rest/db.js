const { query } = require('express');
const { default: knex } = require('knex');
const Client = require('pg').Client
const client = new Client({
    user: 'postgres',
    password: '123',
    database: 'SnackUnoDB',
    host: 'localhost',
    port: 5432
})
module.exports = { client, getAllProducts, insertProduct, deleteProducts }
/////////////////////////////////////////////////////////////////////////////////////////////////////

async function getAllProducts() {
    allProducts = []
    try {
        console.log('Starting connection with database...')
        await client.connect()
        console.log('Connection sucessful!')
        var res = await client.query("SELECT * FROM products")
        allProducts = res.rows
        console.table(res.rows)
        
    }catch (error) {
        console.log(error)
    }
    finally{
        console.log('Connection closed!')
        client.end()
    }
    return await allProducts
}

// getAllProducts()
// // /////////////////////////////////////////////////////////////////////////////////////////////////////////

async function insertProduct(name, price, description, image, stock) {
    allProducts = []
    try {
        console.log('Starting connection with database...')
        await client.connect()
        console.log('Connection sucessful!')
        data = `INSERT INTO products(name, price, description, image, stock) VALUES ('${name}', ${price}, '${description}', '${image}', ${stock})`
        // await client.query(data)
        console.table('Dados inseridos na tabela products')
        await knex.Client.insert(data)
        const res = await client.query("SELECT * FROM products")
        allProducts = res.rows
        console.log(res.rows)
    }catch (error) {
        console.log(error)
    }
    finally{
        client.end()
    }
    return await allProducts
}

// ///////////////////////////////////////////////////////////////////////////////////////////

async function deleteProducts(id_product) {
    allProducts = []
    try {
        console.log('Starting connection with database...')
        await client.connect()
        queryC = `DELETE FROM products WHERE id_product = ${id_product}`
        console.log('Connection sucessful!')
        await client.query(queryC)
        console.table('Data deleted from products')
        const res = await client.query("SELECT * FROM products")
        allProducts = res.rows
        console.log(res.rows)
    }catch (error) {
        console.log(error)
    }
    finally{
        client.end()
    }   
    return await allProducts
}
    
    
//////////x /////////////////////////////////////////////////////////////////////////////////