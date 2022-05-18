const Client = require('pg').Client
const client = new Client({
    user: 'postgres',
    password: 'root',
    database: 'SnackUnoDB',
    host: 'localhost',
    port: 5432
})

module.exports = client
/////////////////////////////////////////////////////////////////////////////////////////////////////

async function getAllProducts() {
    try {
        console.log('Iniciando conexão com o banco de dados...')
        await client.connect()
        console.log('Conectado com sucesso!')
        const res = await client.query("SELECT * FROM products")
        console.table(res.rows)
    }catch (error) {
        console.log(error)
    }
    finally{
        client.end()
    }
}

getAllProducts()

// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// async function sendProducts(name, price) {
//     try {
//         console.log('Iniciando conexão com o banco de dados...')
//         await client.connect()
//         console.log('Conectado com sucesso!')
//         await client.query('INSERT INTO products("name", "price") VALUES ('+"'"+name+" ','"+price+" ');")
//         console.table('Dados inseridos na tabela products')
//         const res = await client.query("SELECT * FROM products")
//         console.log(res.rows)
//     }catch (error) {
//         console.log(error)
//     }
//     finally{
//         client.end()
//     }
// }

// sendProducts("Galinha preta", "14.00")

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