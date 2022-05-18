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
module.exports = { soma, client, getAllProducts, sendProducts }
/////////////////////////////////////////////////////////////////////////////////////////////////////
async function soma(a, b) {
    return await a + b
}

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
        client.end()
    }
    return await allProducts
}

// // /////////////////////////////////////////////////////////////////////////////////////////////////////////

async function sendProducts(name, price) {
    allProducts = []
    try {
        console.log('Starting connection with database...')
        await client.connect()
        console.log('Connection sucessful!')
        queryy = "INSERT INTO products(name, price, description, image, stock) VALUES ('Fanta', 2.50, 'Refrigerante', 'fanta.jpg', 10)"
        await client.query(queryy)
        console.table('Dados inseridos na tabela products')
        const res = await client.query("SELECT * FROM products")
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

// async function deleteProducts(id_product) {
//         try {
//             console.log('Iniciando conexão com o banco de dados...')
//             await client.connect()
//             console.log('Conectado com sucesso!')
//             await client.query("DELETE FROM products where id_product = '"+id_product+"';")
//             console.table('Dados removidos da tabela products')
//             const res = await client.query("SELECT * FROM products")
//             console.log(res.rows)
//         }catch (error) {
//             console.log(error)
//         }
//         finally{
//             client.end()
//         }   
//     }
    
//     deleteProducts(4)
    
//////////x /////////////////////////////////////////////////////////////////////////////////