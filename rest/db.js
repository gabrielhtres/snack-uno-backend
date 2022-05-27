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
        bcrypt.hash(user.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).send(err)
            }
            else {
                console.log(user.password)
                await pool.query(`INSERT INTO users (email, pass) VALUES ('${user.email}', '${hash}')`)
            }
        })
    }catch (error){
        return res.status(500).send(error)
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
        console.log('foi')
        canConnect = await bcrypt.compare(user.password, res.rows[0].pass, (err, result) => {
            console.log(canConnect)
            if(result) {
                console.log('entrou')
                // create  token
                const token = jwt.sign({ 
                    id: res.rows[0].id_user,
                    email: res.rows[0].email,
                },
                dbconfig.env.JWT_KEY,
                {
                    expiresIn: '12h'
                })
                console.log(token)
                return res.status(200).send({
                    message: 'Login successful',
                    token: token
                })
            }
        }) 
    } catch (error) {
        return 401
    }
}

///////////////////////////////////////////////////////////////////////////////////////////