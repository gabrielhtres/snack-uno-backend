const { query } = require('express');
const { default: knex } = require('knex');
const Client = require('pg')
const dbconfig = require ('./nodemon.json')
const bcrypt = require('bcrypt')

let res = ''

const pool = new Client.Pool({ 
    user: dbconfig.env.DB_USER,
    password: dbconfig.env.DB_PASSWORD,
    database: dbconfig.env.DB_DATABASE,
    host: dbconfig.env.DB_HOST,
    port: dbconfig.env.DB_PORT
})

module.exports = {insertProduct, deleteProducts, createUser, getTable, loginUser, getTableByID}

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
// create table product(
// 	id_product serial primary key not null,
// 	name varchar(45) not null,
// 	price float not null,
// 	description varchar(255) not null,
// 	flavor varchar(45)[],
// 	image varchar(255) not null,
// 	id_restaurant integer not null,
// 	foreign key (id_restaurant) references restaurant (id_restaurant),
// 	stock integer not null
// );

async function insertProduct(product) {
    try {
        console.log('\nStarting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
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

/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////USERS////////////////////////////////////////////////////     

async function createUser(user) {
    try {
        if (user == null) {
            return
        }
        console.log('\nStarting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        bcrypt.hash(user.password, 5, async (err, hash) => {
            if (err) {
                return res.status(500).send(err)
            }
            await pool.query(`INSERT INTO users (email, pass) VALUES ('${user.email}', '${hash}')`)
        });
    }catch (error) {
        return res.status(500).send(error)
    }
    finally{
        console.table('Dados inseridos na tabela users')
        return await res.rows
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

async function loginUser(user) {
    try {
        canConnect = false
        console.log('\nStarting connection with database...')
        await pool.connect()
        console.log('Connection sucessful!')
        res = await pool.query(`SELECT * FROM users WHERE email = '${user.email}'`)
        console.table(res.rows)
        if (res.rows.length == 0 || user.email != res.rows[0].email) {
            canConnect = false
            return
        }
        canConnect = await bcrypt.compare(user.password, res.rows[0].pass)
    } catch (error) {
        return res.status(401).send(error)
    }
    finally {
        console.log(canConnect)
        return await canConnect
    }
}

///////////////////////////////////////////////////////////////////////////////////////////